import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SendbirdMessageService } from './sendbird.message.service';
import { SendbirdTextMsgDto } from './entity/dto/sendbird.message.dto';
import { SendbirdBadRequestResponse400201 } from '../../../util/exception/reponse/errorResponse';
import { Jwt } from 'src/common/decorator/CurrentUserDecorator';
import CurrentUser from 'src/mananaweb/auth/dto/currentUser.dto';
import { SendbirdChannelService } from '../channel/sendbird.channel.service';

@ApiTags('sendbird')
@Controller('/sendbird/message')
export class SendbirdMessageController {
  constructor
    (
      private sendbirdMessageService: SendbirdMessageService,
      private sendbirdChannelService: SendbirdChannelService,
    ) { }

  /**
   * Message Send for Group Channel
   * @param msgDto 
   * @returns 
   */
  @Put()
  @ApiOperation({ description: '메세지 전송' })
  @ApiBadRequestResponse({ type: SendbirdBadRequestResponse400201 })
  async sendTextMsg(@Body() msgDto: SendbirdTextMsgDto, @Jwt() cu: CurrentUser) {
    const channel = await this.sendbirdChannelService.getChannelByUrl(msgDto.channelUrl);
    return await this.sendbirdMessageService.sendTextMsgToChannel(msgDto, cu, channel);
  }


  
  /** 미사용 **/
  @Get()
  @ApiOperation({ description: '메세지 조회' })
  async getMsg() {
    return this.sendbirdMessageService.getMsg();
  }
}
