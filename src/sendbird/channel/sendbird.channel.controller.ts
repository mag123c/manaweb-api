import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SendbirdChannelService } from './sendbird.channel.service';
import { SendbirdCreateChannelResponse } from './response/sendbird.channel.response';
import { SendbirdBadRequestResponse400104, SendbirdBadRequestResponse400201 } from '../entity/resopnse/sendbird.error.response';

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
    @ApiBadRequestResponse({ type: SendbirdBadRequestResponse400201 })
    @ApiQuery({ name: 'userId', example: 'test1', type: 'string' })
    async getchannelList(@Query() userId: string) {
      try {
        return await this.sendbirdChannelService.getChannelList(userId);
      } catch(error) {
        console.error(error);
        throw new SendbirdBadRequestResponse400201('[api::channelList] // user');
      }      
    }

    @ApiOperation({ description: '그룹채널 생성' })
    @ApiOkResponse({ type: SendbirdCreateChannelResponse })
    @ApiBadRequestResponse({ type: SendbirdBadRequestResponse400104 })
    @Post('/createChannel')
    async createChannel(@Body() body: { userId: string }) {
      const { userId } = body;
      return await this.sendbirdChannelService.createChannel(userId);
    }

    @ApiOperation({ description: '그룹채널 생성' })
    @ApiOkResponse({ type: SendbirdCreateChannelResponse })
    @ApiBadRequestResponse({ type: SendbirdBadRequestResponse400201 })
    @Post('/createToken')
    async createToken(@Body() body: { userId: string }) {
      const { userId } = body;
      return await this.sendbirdChannelService.createChannel(userId);
    }
}
