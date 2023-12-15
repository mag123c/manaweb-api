import { Injectable, Inject } from '@nestjs/common';
import * as sendbird from 'sendbird-platform-sdk-typescript';
import { SendbirdTextMsgDto } from './entity/dto/sendbird.message.dto';
import { SEND_BIRD_PROVIDER } from '../../sendbird.provider';
import { SendbirdBadRequestException } from '../../../util/exception/customException';
import { SendbirdUserMessageEntityBuild } from '../../builder/sendbird.usermessage.builder';
import CurrentUser from 'src/mananaweb/auth/dto/currentUser.dto';
import { getUnixTime, getUnixTimeAfetrDay } from 'src/common/util/DateUtil';
import { SendbirdMessageRepository } from './sendbird.message.repository';
import { SendbirdUserChannelEntity } from '../../entity/sendbird.userchannel.entity';
import { SendbirdChannelRepository } from '../channel/sendbird.channel.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorTypeCheck } from 'src/mananaweb/util/exception/error-type-check';
import { ReturnInterface } from '../../interface/return.interface';
import { SendbirdChannelService } from '../channel/sendbird.channel.service';

@Injectable()
export class SendbirdMessageService {
    private readonly API_TOKEN: string;
    private readonly messageAPI: sendbird.MessageApi;

    constructor(
        @InjectRepository(SendbirdMessageRepository)
        private readonly sendbirdMessageRepo: SendbirdMessageRepository,
        @InjectRepository(SendbirdChannelRepository)
        private readonly sendbirdChannelRepo: SendbirdChannelRepository,
        @Inject(SEND_BIRD_PROVIDER)
        private sendbirdProvider: { sendbirdMessageAPI, API_TOKEN },
    ) {
        this.API_TOKEN = sendbirdProvider.API_TOKEN;
        this.messageAPI = sendbirdProvider.sendbirdMessageAPI;
    }

    /**
     * Send Text Message To Channel(URL)
     * sendbird send -> db insert / update (message table, channel table)
     * @param messageDto 
     * @returns 
     */
    async sendTextMsgToChannel(messageDto: SendbirdTextMsgDto, cu: CurrentUser): Promise<ReturnInterface> {
        try {
            const { messageType, userId, message, channelUrl } = messageDto;

            const msgSend = await this.messageAPI.sendMessage(this.API_TOKEN, 'group_channels', channelUrl,
                { messageType: messageType, userId: userId, message: message }
            )

            //READ 체크를 위해 메세지 받는사람 온라인여부 체크 (고객 입장에서는 필요없음)
            // 실제 서비스에서 사용 시 with아이디로 web아이디 가져와서 사용할것
            let isOneline = false;
            if (userId === '아이웨딩') {
                const unreadMessageCnt = await this.messageAPI.gcViewNumberOfEachMembersUnreadMessages(this.API_TOKEN, channelUrl, 'test1')
                isOneline = (unreadMessageCnt.unread['test1'] > 1) ? false : true;
            }

            // console.log(channel.members, targetUserOnlineStatus);

            // 메세지 DB 저장
            const targetId = msgSend.user.userId;
            const messageId = msgSend.messageId;
            const messageEntity = await SendbirdUserMessageEntityBuild(cu.webId, channelUrl, messageId, message, targetId, getUnixTime(), isOneline);
            await this.sendbirdMessageRepo.save(messageEntity);

            // 채널 업데이트
            //  unreadMessageCount 고려 안했음.
            const channelEntity = new SendbirdUserChannelEntity();
            const unixTime = getUnixTime();
            channelEntity.lastMessageMessage = message;
            channelEntity.lastMessageSenderUserId = targetId;
            channelEntity.lastMessageCreatedAt = unixTime;
            channelEntity.createdAt = unixTime;
            channelEntity.channelUrl = channelUrl;

            const channelUpdateResult = await this.sendbirdChannelRepo.updateChannel(channelEntity);

            // 센드버드 서버로 메세지 전송 후 DB작업이라서 DB insert 실패 경우 예외처리해서 롤백해야하는 이슈 -_-... 일단 없는 걸로 작업함
            // DB Conn Fail아니면 일어날 것 같지는 않음.
            if (channelUpdateResult.affected === 0) {
                return { status: true, message: '[init sendbird is success, but channel DB update fail when initialized message send]' }
            }
            return { status: true, message: '[success initialize]' }

        } catch (error) {
            ErrorTypeCheck(error);
        }
    }

    /**
     * 
     * @param webId 
     * @param channelUrl 
     * @param nowUnixTime 
     * @returns 
     */
    async updateReadStatus(webId: string, channelUrl: string) {
        return await this.sendbirdMessageRepo.updateReadStatus(webId, channelUrl);
    }


    /** 미사용 **/
    async getMsg() {
        try {
            const msg = await this.messageAPI.listMessages(this.API_TOKEN, 'group_channels', 'sendbird_group_channel_134364416_f8018bdf877118b5e3d2dff9a34cbd9565bf79b0', '1484208113351')
            return msg;
        } catch (error) {
            ErrorTypeCheck(error);
        }
    }
}