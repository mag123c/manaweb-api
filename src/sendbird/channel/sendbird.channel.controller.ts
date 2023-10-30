import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendbirdChannelService } from './sendbird.channel.service';
import { SendbirdCreateChannelResponse } from './response/sendbird.channel.response';
import { SendbirdBadRequestResponse400104 } from '../entity/resopnse/sendbird.error.response';

@ApiTags('sendbird')
@Controller('/api/v1/sendbird/channel')
export class SendbirdChannelController {
  constructor
    (
      private sendbirdChannelService: SendbirdChannelService,
    ){
      
    }

    @ApiOperation({ description: '그룹채널 리스트 조회' })
    @Get('/channelList')
    async getchannelList() {
      return await this.sendbirdChannelService.getChannelList();
    }

    @ApiOperation({ description: '그룹채널 생성' })
    @ApiOkResponse({ type: SendbirdCreateChannelResponse })
    @ApiBadRequestResponse({ type: SendbirdBadRequestResponse400104 })
    @Post('/createChannel')
    async createChannel() {
      return await this.sendbirdChannelService.createChannel();
    }
}
