import { Injectable, Inject } from '@nestjs/common';
import * as sendbird from 'sendbird-platform-sdk-typescript';
import { SEND_BIRD_PROVIDER } from '../../sendbird.provider';

@Injectable()
export class SendbirdChatbotService {
    private readonly API_TOKEN: string;
    private readonly chatbotAPI: sendbird.BotApi;

    constructor(
        @Inject(SEND_BIRD_PROVIDER)
        private sendbirdProvider: { sendbirdChatbotAPI, API_TOKEN },
    ) {       
        this.API_TOKEN = sendbirdProvider.API_TOKEN;
        this.chatbotAPI = sendbirdProvider.sendbirdChatbotAPI;
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
