import { Injectable, Inject } from '@nestjs/common';
import * as sendbird from 'sendbird-platform-sdk-typescript';
import { SendbirdTextMsgDto } from '../message/entity/dto/sendbird.message.dto';
import { SEND_BIRD_PROVIDER } from '../../sendbird.provider';
import { SendbirdMessageService } from '../message/sendbird.message.service';
import { SendbirdBadRequestException } from '../../util/customException';

@Injectable()
export class SendbirdChannelService {
    private readonly API_TOKEN: string;
    private readonly IBOT_ID: string;
    private readonly channelAPI: sendbird.GroupChannelApi;
    private readonly chatbotAPI: sendbird.BotApi;

    constructor(
        private readonly sendbirdMessageService: SendbirdMessageService,
        @Inject(SEND_BIRD_PROVIDER)
        private sendbirdProvider: { sendbirdChannelAPI, sendbirdChatbotAPI, API_TOKEN, IBOT_ID },
    ) {
        this.API_TOKEN = sendbirdProvider.API_TOKEN;
        this.channelAPI = sendbirdProvider.sendbirdChannelAPI;
        this.chatbotAPI = sendbirdProvider.sendbirdChatbotAPI;
    }

    /** API part **/

    /**
     * Get Group Channel List By UserID(Jwt Token Validate)
     * API endpoint - GET api/v1/sendbird/groupChannel
     * @param userId 
     * @returns 
     */
    async getGroupChannelListByUserIdAPI(userId: string) {
        return await this.getGroupChannelListByUserId(userId);
    }

    /**
     * Create Group Channel List By UserID(Jwt Token Validate)
     * API endpoint - POST api/v1/sendbird/groupChannel
     * @param userId 
     * @returns 
     */
    async createGroupChannelByUserIdAPI(userId: string, target: string) {
        return await this.createGroupChannelByUserId(userId, target);
    }

    /** API part end **/



    /** Business Logic part **/

    /**
     * Get Group Channel List By UserID
     * @param userId 
     * @returns GcListChannelsResponse
     */
    async getGroupChannelListByUserId(userId: string): Promise<sendbird.GcListChannelsResponse> {
        try {
            const channelList = await this.channelAPI.gcListChannels(this.API_TOKEN, userId);
            return channelList;
        }
        catch (error) {
            const { message, code } = JSON.parse(error.body);
            throw new SendbirdBadRequestException(message, code);
        }
    }

    /**
     * Create Group Channel UserID -> TargetID
     * @param userId 
     * @param targetId 
     * @returns 
     */
    async createGroupChannelByUserId(userId: string, targetId: string): Promise<sendbird.SendBirdGroupChannelChannel> {
        if (!targetId) targetId = '아이웨딩';
        const userIds = [userId, targetId];
        try {
            const channel = await this.channelAPI.gcCreateChannel(this.API_TOKEN, { userIds, isDistinct: true });
            return channel.channel;
        }
        catch (error) {
            const { message, code } = JSON.parse(error.body);
            throw new SendbirdBadRequestException(message, code);
        }
    }

    /** Business Logic part end **/


    /** 미사용 코드 **/
    async initChannel(userId: string) {
        const channel = await this.createGroupChannelByUserIdAPI(userId, '아이웨딩');
        if (!channel) throw new sendbird.HttpException('initChannel::createChannel error');

        const { channelUrl } = channel;
        this.initChatbot(channelUrl);
        const dto: SendbirdTextMsgDto = {
            message_type: "MESG",
            user_id: "아이웨딩",
            message: "안녕하세요? 무엇을 도와드릴까요?",
            channel_url: channelUrl
        }
        return await this.sendbirdMessageService.sendTextMsgAPI(dto);
    }

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

    //채팅방 입장 시 해당 채팅방 정보
    async getChannelByUrl(channelUrl: string) {
        try {
            const channel = await this.channelAPI.gcViewChannelByUrl(this.API_TOKEN, channelUrl, true, true);
        }
        catch (error) {
            throw new sendbird.HttpException('getChannelByUrl');
        }
    }
}