import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SendbirdMessageService } from './sendbird.message.service';
import { SendbirdTextMsgDto } from './entity/dto/sendbird.message.dto';
import { SendbirdBadRequestResponse400201 } from '../../util/reponse/errorResponse';

@ApiTags('sendbird')
@Controller('/sendbird/message')
export class SendbirdMessageController {
  constructor
    (
      private sendbirdMessageService: SendbirdMessageService,
    ) { }

  /**
   * Message Send for Group Channel
   * @param msgDto 
   * @returns 
   */
  @Put()
  @ApiOperation({ description: '메세지 전송' })
  @ApiBadRequestResponse({ type: SendbirdBadRequestResponse400201 })
  async sendTextMsg(@Body() msgDto: SendbirdTextMsgDto) {
    return await this.sendbirdMessageService.sendTextMsgAPI(msgDto);
  }


  
  /** 미사용 **/
  @Get()
  @ApiOperation({ description: '메세지 조회' })
  async getMsg() {
    return this.sendbirdMessageService.getMsg();
  }
}
