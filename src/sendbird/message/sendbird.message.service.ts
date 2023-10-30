import { Injectable } from '@nestjs/common';
import * as sendbird from 'sendbird-platform-sdk-typescript';
import { ConfigService } from '@nestjs/config';
import { SendbirdTextMsgDto } from './entity/dto/sendbird.message.dto';

@Injectable()
export class SendbirdMessageService {
    APP_ID: string;
    API_TOKEN: string;
    serverConfig: sendbird.ServerConfiguration<{app_id: string}>;
    configuration: sendbird.Configuration;
    sendbirdAPI: sendbird.MessageApi;

    constructor(
        private readonly configService: ConfigService,
    ){
        this.APP_ID = this.configService.get('SENDBIRD_APP_ID');
        this.API_TOKEN = this.configService.get('SENDBIRD_API_TOKEN');
        this.serverConfig = new sendbird.ServerConfiguration(`https://api-${this.APP_ID}.sendbird.com`, { "app_id": this.APP_ID });
        this.configuration = sendbird.createConfiguration({ baseServer: this.serverConfig });
        this.sendbirdAPI = new sendbird.MessageApi(this.configuration);
    }

    async sendTextMsg (messageDto: SendbirdTextMsgDto, channel_url: string) {        
        try {
            console.log(channel_url);
            const { message_type, user_id, message } = messageDto;
            const msgSend = await this.sendbirdAPI.sendMessage(this.API_TOKEN, 'group_channels', channel_url,
                { messageType: message_type, userId: user_id, message: message }
            )
            return msgSend;
        } catch(error) {
            throw new sendbird.HttpException('sendTextMsg');
        }
    }
}