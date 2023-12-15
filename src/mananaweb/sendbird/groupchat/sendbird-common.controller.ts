import { Controller, Param, Post, Put } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SendbirdCreateChannelResponse } from "./channel/response/sendbird.channel.response";
import { SendbirdBadRequestResponse400104 } from "src/mananaweb/util/exception/reponse/errorResponse";
import { Jwt } from "src/common/decorator/CurrentUserDecorator";
import CurrentUser from "src/mananaweb/auth/dto/currentUser.dto";
import { ReturnInterface } from "../interface/return.interface";
import { SendbirdCommonService } from "./sendbird-common.service";

@ApiTags('센드버드 추상화 컨트롤러')
@Controller('/sendbird/common')
export class SendbirdCommonController {
    constructor(private readonly sendbirdCommomService: SendbirdCommonService,) { }

    /**
    * 
    * @param cu (Jwt Token > User Validate)
    * @returns 
    */
    @ApiOperation({ description: '그룹채널 생성' })
    @ApiOkResponse({ type: SendbirdCreateChannelResponse })
    @ApiBadRequestResponse({ type: SendbirdBadRequestResponse400104 })
    @Post('init-channel')
    async initializeChannel(@Jwt() cu: CurrentUser): Promise<ReturnInterface> {
        return await this.sendbirdCommomService.initChannel(cu);
    }

    /**
     * 입장 / 퇴장 시 이전까지의 message read
     * @param cu 
     * @param channelUrl 
     * @returns 
     */
    @ApiOperation({ description: '유저 입장 시 읽음처리' })
    @Put('enter-channel/:channelUrl')
    async messageReadWhenEnteredChannel(@Jwt() cu: CurrentUser, @Param('channelUrl') channelUrl: string): Promise<ReturnInterface> {
        return await this.sendbirdCommomService.messageRead(cu.webId, channelUrl);
    }
}