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
    messageApi: sendbird.MessageApi;

    constructor(
        private readonly configService: ConfigService,
    ){
        this.APP_ID = this.configService.get('SENDBIRD_APP_ID');
        this.API_TOKEN = this.configService.get('SENDBIRD_API_TOKEN');
        this.serverConfig = new sendbird.ServerConfiguration(`https://api-${this.APP_ID}.sendbird.com`, { "app_id": this.APP_ID });
        this.configuration = sendbird.createConfiguration({ baseServer: this.serverConfig });
        this.messageApi = new sendbird.MessageApi(this.configuration);
    }

    async sendTextMsg (messageDto: SendbirdTextMsgDto, channel_url: string) {      
        try {
            const { message_type, user_id, message } = messageDto;
            // const data = [
            //     {
            //         title: '카드 1',
            //         description: '카드 1에 대한 설명',
            //         imageUrl: 'http://daum.net',
            //       },
            //       {
            //         title: '카드 2',
            //         description: '카드 2에 대한 설명',
            //         imageUrl: 'http://naver.com',
            //       },
            // ];
            const meta_data = [{
                font_preference: "times new roman",
                font_color: "black",
                background_color: "red",                
            }]
            const msgSend = await this.messageApi.sendMessage(this.API_TOKEN, 'group_channels', channel_url,
                { messageType: message_type, userId: user_id, message: message, isSilent: true,
                 data: JSON.stringify(meta_data) }
            )
            return msgSend;
        } catch(error) {
            throw new sendbird.HttpException('sendTextMsg');
        }
    }

    async getMsg() {
        try {            
            const msg = await this.messageApi.listMessages(this.API_TOKEN, 'group_channels', 'sendbird_group_channel_132276856_8dfd8be8ec15d3630b0e3782ad868afcd4af8219', '1484208113351')
            console.log(msg);
            return msg;
        } catch(error) {
            throw new sendbird.HttpException('getMsg');
        }
    }
}