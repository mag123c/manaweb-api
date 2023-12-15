import { Injectable, Inject } from '@nestjs/common';
import * as sendbird from 'sendbird-platform-sdk-typescript';
import { SEND_BIRD_PROVIDER } from '../../sendbird.provider';
import { SendbirdBadRequestException } from '../../../util/exception/customException';
import { SendbirdChannelRepository } from './sendbird.channel.repository';
import { SendbirdUserChannelEntity } from '../../entity/sendbird.userchannel.entity';
import CurrentUser from 'src/mananaweb/auth/dto/currentUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorTypeCheck } from 'src/mananaweb/util/exception/error-type-check';

@Injectable()
export class SendbirdChannelService {

    private readonly API_TOKEN: string;
    private readonly IBOT_ID: string;
    private readonly channelAPI: sendbird.GroupChannelApi;
    private readonly chatbotAPI: sendbird.BotApi;

    constructor(
        @InjectRepository(SendbirdChannelRepository)
        private readonly sendbirdChannelRepo: SendbirdChannelRepository,
        @Inject(SEND_BIRD_PROVIDER)
        private sendbirdProvider: { sendbirdChannelAPI, sendbirdChatbotAPI, API_TOKEN, IBOT_ID },
    ) {
        this.API_TOKEN = sendbirdProvider.API_TOKEN;
        this.channelAPI = sendbirdProvider.sendbirdChannelAPI;
        this.chatbotAPI = sendbirdProvider.sendbirdChatbotAPI;
    }

    /**
     * Get Group Channel List From Sendbird By UserID
     * @param userId 
     * @returns GcListChannelsResponse
     */
    async getGroupChannelListByUserId(webId: string): Promise<sendbird.GcListChannelsResponse> {
        try {
            const channelList = await this.channelAPI.gcListChannels(this.API_TOKEN);
            return channelList;
        }
        catch (error) {
            ErrorTypeCheck(error);
        }
    }

    /**
 * Create Group Channel UserID -> TargetID
 * @param userId 
 * @param targetId 
 * @returns 
 */
    async createGroupChannelByUserId(cu: CurrentUser, targetId: string): Promise<sendbird.SendBirdGroupChannel> {
        if (!targetId) targetId = '아이웨딩';
        const userIds = [cu.webId, targetId];
        try {
            const channel = await this.channelAPI.gcCreateChannel(this.API_TOKEN, { userIds, isDistinct: true });

            //targetId로 withId 조회해서 리턴해서 withId컬럼에 넣어주기, 지금은 임시.
            //targetId로 withId 조회해서 리턴해서 withId컬럼에 넣어주기, 지금은 임시.
            //targetId로 withId 조회해서 리턴해서 withId컬럼에 넣어주기, 지금은 임시.
            //고객님이 방을 여는 경우는 없기 때문에, withId - 고객, channelCreateId - 방 생성자. (서비스팀, 업체)
            // DB insert            
            const channelEntity = new SendbirdUserChannelEntity();
            channelEntity.withId = cu.withId;
            channelEntity.channelCreateId = cu.webId;
            channelEntity.channelUrl = channel.channelUrl;

            const existChannel = await this.sendbirdChannelRepo.findOneBy({ channelUrl: channelEntity.channelUrl });
            if (existChannel) return null;

            const insertResult = await this.sendbirdChannelRepo.save(channelEntity);

            if (!insertResult) {
                throw new SendbirdBadRequestException('GroupChannel created,, but insert Fail', 404);
            }

            return channel;
        }
        catch (error) {
            ErrorTypeCheck(error);
        }
    }


    //channel DB select query
    async getGroupChannelListFromDB(withId: string) {
        return await this.sendbirdChannelRepo.findByUserId(withId);
    }

    //채팅방 입장 시 해당 채팅방 정보
    async getChannelByUrl(channelUrl: string): Promise<sendbird.SendBirdGroupChannel> {
        try {
            const a = await this.channelAPI.gcViewChannelByUrl(this.API_TOKEN, channelUrl, true, true, true, true, true);
            const b = await this.channelAPI.gcListMembers(this.API_TOKEN, channelUrl)
            console.log(b);
            return a;
        }        
        catch (error) {
            ErrorTypeCheck(error);
        }
    }

    /** 미사용 코드 **/
    async initChatbot(channelUrl: string) {
        try {
            const ibot = await this.chatbotAPI.joinChannels(this.API_TOKEN, this.IBOT_ID, {
                channelUrls: [channelUrl],
                botUserid: ''
            })
            const msg = await this.chatbotAPI.sendBotsMessage(this.API_TOKEN, this.IBOT_ID, {
                message: 'test',
                channelUrl: channelUrl,
            })
            return ibot;
        }
        catch (error) {
            throw new sendbird.HttpException('initChatbot');
        }
    }


}