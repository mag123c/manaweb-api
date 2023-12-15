import { Injectable } from "@nestjs/common";
import { SendbirdMessageService } from "./message/sendbird.message.service";
import { SendbirdChannelService } from "./channel/sendbird.channel.service";
import CurrentUser from "src/mananaweb/auth/dto/currentUser.dto";
import { SendbirdUserService } from "./user/sendbird.user.service";
import { ReturnInterface } from "../interface/return.interface";
import { SendbirdTextMsgDto } from "./message/entity/dto/sendbird.message.dto";

@Injectable()
export class SendbirdCommonService {
    constructor(
        private readonly sendbirdMessageService: SendbirdMessageService,
        private readonly sendbirdChannelService: SendbirdChannelService,
        private readonly sendbirdUserService: SendbirdUserService,
        // private readonly sendbirdChatBotService: SendbirdChatbotService,
    ) { }

    /**
     * 채팅방 없을 경우 초기화
     *  -> 채팅방 생성, 아이웨딩 측에서 고객에게 메세지 전송
     * @param userId 
     * @returns 
     */
    async initChannel(cu: CurrentUser): Promise<ReturnInterface> {
        const channel = await this.sendbirdChannelService.createGroupChannelByUserId(cu, '아이웨딩');
        if (!channel) {
            return { status: false, message: 'already channel exists' };
        };

        const { channelUrl } = channel;

        //챗봇 미사용
        // await this.sendbirdChatBotService.initChatbot(channelUrl);

        const dto: SendbirdTextMsgDto = {
            messageType: "MESG",
            userId: "아이웨딩",
            message: "안녕하세요? 무엇을 도와드릴까요?",
            channelUrl: channelUrl
        }

        return await this.sendbirdMessageService.sendTextMsgToChannel(dto, cu, channel);
    }

}