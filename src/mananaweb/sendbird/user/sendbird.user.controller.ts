import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendbirdUserService } from './sendbird.user.service';
import { SendbirdDashBoardUserCreateResponse, SendbirdDashBoardUserListResponse, SendbirdDashBoardUserResponse, SendbirdDashBoardUserTokenResponse } from './resopnse/sendbird.user.response';
import { SendbirdBadRequestResponse400105, SendbirdBadRequestResponse400201, SendbirdBadRequestResponse400202 } from '../util/reponse/errorResponse';
import { Jwt } from 'src/common/decorator/CurrentUserDecorator';
import CurrentUser from 'src/mananaweb/auth/dto/currentUser.dto';
import { QueryDto } from './query.dto';
@ApiTags('sendbird')
@Controller('/sendbird/user')
export class SendbirdUserController {
  constructor
    (
      private sendbirdUserSerivce: SendbirdUserService,
    ) { }

  /**
   * 
   * @param userId 
   * @returns user
   */
  @ApiOperation({ description: '대쉬보드 유저 정보' })
  @ApiOkResponse({ type: SendbirdDashBoardUserResponse })
  @ApiBadRequestResponse({ type: SendbirdBadRequestResponse400201 })
  @Get()
  async getConnectionByUserId(@Jwt() cu: CurrentUser) {
    return await this.sendbirdUserSerivce.getConnectionByUserId(cu);
  }

  /**
   * 
   * @param userId 
   * @returns user
   */
  @ApiOperation({ description: '대쉬보드 유저 생성' })
  @ApiOkResponse({ type: SendbirdDashBoardUserCreateResponse })
  @ApiBadRequestResponse({ type: SendbirdBadRequestResponse400202 })
  @Post(':userId')
  createUser(@Param('userId') userId: string) {
    return this.sendbirdUserSerivce.createUserFromSendbirdDashboard(userId);
  }

  // **************************************아래는 미사용하는 코드********************************************** 

  /**
   *  실 사용 시 Controller endpoint sendbird로 변경 후 user/users 나눠서 사용
   * @returns user[]
   */
  @ApiOperation({ description: '대쉬보드 유저 리스트 전체' })
  @ApiOkResponse({ type: SendbirdDashBoardUserListResponse })
  @ApiBadRequestResponse({ type: SendbirdBadRequestResponse400105 })
  @Get('users')
  async getUserList() {
    return await this.sendbirdUserSerivce.getUserList();
  }

  /**
   * 
   * @param userId 
   * @returns user token
   */
  @ApiOperation({ description: '토큰 발급' })
  @Post(':userId/token')
  async createToken(@Param('userId') userId: string) {
    return await this.sendbirdUserSerivce.createUserToken(userId);
  }
}
