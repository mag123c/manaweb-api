import { Injectable } from '@nestjs/common';
import * as sendbird from 'sendbird-platform-sdk-typescript';
import { ConfigService } from '@nestjs/config';
import { SendbirdMessageService } from '../message/sendbird.message.service';
import { SendbirdTextMsgDto } from '../message/entity/dto/sendbird.message.dto';

@Injectable()
export class SendbirdChannelService {
    APP_ID: string;
    API_TOKEN: string;
    IBOT_ID: string;
    serverConfig: sendbird.ServerConfiguration<{app_id: string}>;
    configuration: sendbird.Configuration;
    channelAPI: sendbird.GroupChannelApi;
    chatbotAPI: sendbird.BotApi;

    constructor(
        private readonly configService: ConfigService,
        private sendbirdMsgService: SendbirdMessageService,
    ){
        this.APP_ID = this.configService.get('SENDBIRD_APP_ID');
        this.API_TOKEN = this.configService.get('SENDBIRD_API_TOKEN');
        this.IBOT_ID = this.configService.get('IBOT_ID');
        this.serverConfig = new sendbird.ServerConfiguration(`https://api-${this.APP_ID}.sendbird.com`, { "app_id": this.APP_ID });
        this.configuration = sendbird.createConfiguration({ baseServer: this.serverConfig });
        this.channelAPI = new sendbird.GroupChannelApi(this.configuration);
        this.chatbotAPI = new sendbird.BotApi(this.configuration);
    }
    //채널 목록 조회
    async getChannelList(userId: string) {
        try {            
            const channelList = await this.channelAPI.gcListChannels(this.API_TOKEN, userId);
            return channelList;
        } catch (error) {
            throw new sendbird.HttpException('getChannelList');
        }
    }

    //채널 만들기(임시::관리자문의)
    async createChannel(userId: string) {
        const userIds = ['아이웨딩', userId];
        try {
            const channel = await this.channelAPI.gcCreateChannel(this.API_TOKEN, { userIds, operatorIds: ['ibotibotibotibotibot'], isDistinct: true });
            return channel.channel;
        } catch (error) {
            throw new sendbird.HttpException('createChannel');
        }        
    }

    //채팅방 입장 시 해당 채팅방 정보
    async getChannelByUrl(channelUrl: string) {
        try {
           const channel = await this.channelAPI.gcViewChannelByUrl(this.API_TOKEN, channelUrl, true, true);
        } catch (error) {
            throw new sendbird.HttpException('getChannelByUrl');
        }
    }

    async initChannel(userId: string) {
        const channel = await this.createChannel(userId);
        if(!channel) throw new sendbird.HttpException('initChannel::createChannel error');

        const { channelUrl } = channel;
        this.initChatbot(channelUrl);
        const dto:SendbirdTextMsgDto = {
            message_type: "MESG",
            user_id: "아이웨딩",
            message: "안녕하세요? 무엇을 도와드릴까요?"
        }        
        return await this.sendbirdMsgService.sendTextMsg(dto, channelUrl);
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
        } catch (error) {
            throw new sendbird.HttpException('initChatbot');
        }
    }
}