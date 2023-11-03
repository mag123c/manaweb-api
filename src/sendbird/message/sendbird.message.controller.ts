import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SendbirdMessageService } from './sendbird.message.service';
import { SendbirdTextMsgDto } from './entity/dto/sendbird.message.dto';
import { SendbirdBadRequestResponse400201 } from '../entity/resopnse/sendbird.error.response';

@ApiTags('sendbird')
@Controller('/api/v1/sendbird/message')
export class SendbirdMessageController {
  constructor
    (
      private sendbirdMessageService: SendbirdMessageService,
    ){}

    @Put('/sendMsg')
    @ApiOperation({ description: '메세지 전송' })
    @ApiBadRequestResponse({ type: SendbirdBadRequestResponse400201 })
    async sendTextMsg(@Body() body: { messageDto: SendbirdTextMsgDto, channel_url: string } ) {
      try {
        const { messageDto, channel_url } = body;
        console.log(channel_url);
        return await this.sendbirdMessageService.sendTextMsg(messageDto, channel_url);
      }
      catch (error) {
        throw new SendbirdBadRequestResponse400201('[api::sendMsg] // channel');
      }
    }

    @Get('/msg')
    @ApiOperation({ description: '메세지 조회' })
    async getMsg() {
      return this.sendbirdMessageService.getMsg();
    }
}
