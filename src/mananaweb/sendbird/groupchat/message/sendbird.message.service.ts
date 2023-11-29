import { Injectable, Inject } from '@nestjs/common';
import * as sendbird from 'sendbird-platform-sdk-typescript';
import { SendbirdTextMsgDto } from './entity/dto/sendbird.message.dto';
import { SEND_BIRD_PROVIDER } from '../../sendbird.provider';

@Injectable()
export class SendbirdMessageService {
    private readonly API_TOKEN: string;
    private readonly messageAPI: sendbird.MessageApi;

    constructor(
        @Inject(SEND_BIRD_PROVIDER)
        private sendbirdProvider: { sendbirdMessageAPI, API_TOKEN },
    ) {       
        this.API_TOKEN = sendbirdProvider.API_TOKEN;
        this.messageAPI = sendbirdProvider.sendbirdMessageAPI;
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
            const msgSend = await this.messageAPI.sendMessage(this.API_TOKEN, 'group_channels', channel_url,
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
            const msg = await this.messageAPI.listMessages(this.API_TOKEN, 'group_channels', 'sendbird_group_channel_132276856_8dfd8be8ec15d3630b0e3782ad868afcd4af8219', '1484208113351')
            console.log(msg);
            return msg;
        } catch(error) {
            throw new sendbird.HttpException('getMsg');
        }
    }
}