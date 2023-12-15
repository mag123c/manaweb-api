import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SendbirdChannelService } from './sendbird.channel.service';
import { SendbirdCreateChannelResponse } from './response/sendbird.channel.response';
import { SendbirdBadRequestResponse400104, SendbirdBadRequestResponse400201 } from '../../../util/exception/reponse/errorResponse';
import { Jwt } from 'src/common/decorator/CurrentUserDecorator';
import CurrentUser from 'src/mananaweb/auth/dto/currentUser.dto';
import { ReturnInterface } from '../../interface/return.interface';

@ApiTags('sendbird')
@Controller('/sendbird/channel')
export class SendbirdChannelController {
  constructor
    (
      private sendbirdChannelService: SendbirdChannelService,
    ) {

  }

  /**
   * 
   * @param cu (Jwt Token > User Validate)
   * @returns 
   */
  @ApiOperation({ description: '그룹채널 리스트 조회' })
  @Get()
  @ApiBadRequestResponse({ type: SendbirdBadRequestResponse400201 })
  async getChannelList(@Jwt() cu: CurrentUser) {
    return await this.sendbirdChannelService.getGroupChannelListByUserId(cu.webId);
  }

  @ApiOperation({ description: '채널 URL로 채널정보 조회' })
  @Get(':channelUrl')
  @ApiBadRequestResponse({ type: SendbirdBadRequestResponse400201 })
  async getChannelListByUrl(@Jwt() cu: CurrentUser, @Param('channelUrl') channelUrl: string) {
    return await this.sendbirdChannelService.getChannelByUrl(channelUrl);
  }

  /**
   * 
   * @param cu (Jwt Token > User Validate)
   * @returns 
   */
  @ApiOperation({ description: '그룹채널 생성' })
  @ApiOkResponse({ type: SendbirdCreateChannelResponse })
  @ApiBadRequestResponse({ type: SendbirdBadRequestResponse400104 })
  @Post()
  async createChannel(@Jwt() cu: CurrentUser, @Body('target') target: string) {
    return await this.sendbirdChannelService.createGroupChannelByUserId(cu, target);
  }

}
