import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SendbirdChannelService } from './sendbird.channel.service';
import { SendbirdCreateChannelResponse } from './response/sendbird.channel.response';
import { SendbirdBadRequestResponse400104, SendbirdBadRequestResponse400201 } from '../../util/reponse/errorResponse';
import { Jwt } from 'src/common/decorator/CurrentUserDecorator';
import CurrentUser from 'src/mananaweb/auth/dto/currentUser.dto';

@ApiTags('sendbird')
@Controller('/sendbird/groupChannel')
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
  async getchannelList(@Jwt() cu: CurrentUser) {
    return await this.sendbirdChannelService.getGroupChannelListByUserIdAPI(cu.web_id);
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
    return await this.sendbirdChannelService.createGroupChannelByUserIdAPI(cu.web_id, target);
  }
}
