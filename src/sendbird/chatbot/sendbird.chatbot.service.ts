import { Injectable } from '@nestjs/common';
import * as sendbird from 'sendbird-platform-sdk-typescript';
import { ConfigService } from '@nestjs/config';
import { SendbirdMessageService } from '../message/sendbird.message.service';

@Injectable()
export class SendbirdChatbotService {
    APP_ID: string;
    API_TOKEN: string;
    IBOT_ID: string;
    serverConfig: sendbird.ServerConfiguration<{app_id: string}>;
    configuration: sendbird.Configuration;
    chatbotAPI: sendbird.BotApi;

    constructor(
        private readonly configService: ConfigService,
    ){
        this.APP_ID = this.configService.get('SENDBIRD_APP_ID');
        this.API_TOKEN = this.configService.get('SENDBIRD_API_TOKEN');
        this.IBOT_ID = this.configService.get('IBOT_ID');
        this.serverConfig = new sendbird.ServerConfiguration(`https://api-${this.APP_ID}.sendbird.com`, { "app_id": this.APP_ID });
        this.configuration = sendbird.createConfiguration({ baseServer: this.serverConfig });
        this.chatbotAPI = new sendbird.BotApi(this.configuration);
    }
    async getBotList() {
        try {
            const bots = await this.chatbotAPI.listBots(this.API_TOKEN);
            return bots;
        } catch (error) {
            throw new sendbird.HttpException('getBotList');
        }
    }
}
