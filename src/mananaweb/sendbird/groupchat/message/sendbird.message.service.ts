import { Injectable, Inject } from '@nestjs/common';
import * as sendbird from 'sendbird-platform-sdk-typescript';
import { SendbirdTextMsgDto } from './entity/dto/sendbird.message.dto';
import { SEND_BIRD_PROVIDER } from '../../sendbird.provider';
import { SendbirdBadRequestException } from '../../util/customException';

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

    /** API part **/

    /**
     * Message Send to Channel(URL)
     * @param messageDto 
     * @returns 
     */
    async sendTextMsgAPI(messageDto: SendbirdTextMsgDto) {
        return await this.sendTextMsgToChannel(messageDto);
    }

    /** API part end**/



    /** Business logic part **/

    /**
     * Send Text Message To Channel(URL)
     * @param messageDto 
     * @returns 
     */
    async sendTextMsgToChannel(messageDto: SendbirdTextMsgDto): Promise<sendbird.SendBirdMessageResponse> {
        try {
            const { message_type, user_id, message, channel_url } = messageDto;

            const msgSend = await this.messageAPI.sendMessage(this.API_TOKEN, 'group_channels', channel_url,
                { messageType: message_type, userId: user_id, message: message, isSilent: true }
            )
            return msgSend;
        } catch (error) {
            const { message, code } = JSON.parse(error.body);
            throw new SendbirdBadRequestException(message, code);
        }
    }
    /** Business logic part end**/


    /** 미사용 **/
    async getMsg() {
        try {
            const msg = await this.messageAPI.listMessages(this.API_TOKEN, 'group_channels', 'sendbird_group_channel_132276856_8dfd8be8ec15d3630b0e3782ad868afcd4af8219', '1484208113351')
            console.log(msg);
            return msg;
        } catch (error) {
            throw new sendbird.HttpException('getMsg');
        }
    }
}