import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendbirdUserService } from './sendbird.user.service';
import { CreateUserDto } from './dto/sendbird.user.dto';
import { SendbirdDashBoardUserCreateResponse, SendbirdDashBoardUserListResponse } from './resopnse/sendbird.user.response';
import { SendbirdBadRequestResponse400105, SendbirdBadRequestResponse400111 } from '../resopnse/sendbird.error.response';

@ApiTags('sendbird')
@Controller('/api/v1/sendbird/user')
export class SendbirdUserController {
  constructor
    (
      private sendbirdUserSerivce: SendbirdUserService,
    ){}

  @ApiOperation({ description: '대쉬보드 유저 리스트 전체' })
  @ApiOkResponse({ type: SendbirdDashBoardUserListResponse })
  @ApiBadRequestResponse({ type:SendbirdBadRequestResponse400105 })
  @Get('userList')
  async getUserList() {
    return await this.sendbirdUserSerivce.userList();
  }

  @ApiOperation({ description: '대쉬보드 유저 생성' })
  @ApiOkResponse({ type: SendbirdDashBoardUserCreateResponse })
  @ApiBadRequestResponse({ type: SendbirdBadRequestResponse400111 })
  @Post('createUser')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.sendbirdUserSerivce.createUser(createUserDto);
  }
}
