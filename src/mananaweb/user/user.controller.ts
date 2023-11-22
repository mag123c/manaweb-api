import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards, Request, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Jwt } from 'src/common/decorator/CurrentUserDecorator';
import CurrentUser from '../auth/dto/currentUser.dto';
import UserInvestmentDataPutDto from './dto/user-investmentData.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UserLeaderBoardDto } from './dto/user-leardboard.dto';
import { VisitorGuard } from '../auth/guard/visitor-auth.guard';

@ApiTags('user')
@ApiBearerAuth('accessToken')
@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/check')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: '토큰 검증' })
  async checkToken(@Request() req) {
    return req.user;
  }

  @Get('/myInvestmentData')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: '투자내역 조회' })
  async getInvestmentDataByYyyyMm(@Jwt() cu: CurrentUser, @Query('yyyymm') yyyymm: string) {
     return await this.userService.getInvestmentDataByYyyyMm(cu.no, yyyymm);
  }

  @Put('/myInvestmentData')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: '투자내역 입력(by day) '})
  async putInvestmentData(@Jwt() cu: CurrentUser, @Body() userInvDataPutDto: UserInvestmentDataPutDto) {
    return await this.userService.putInvestmentData(cu.no, userInvDataPutDto);
  }

  @Delete('/myInvestmentData/:yyyymm/:day')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: '투자내역 초기화(day)' })
  async deleteInvestmentData(@Jwt() cu: CurrentUser, @Param() params) {
    const { yyyymm, day } = params;
    return await this.userService.deleteInvestmentData(cu.no, yyyymm, day)
  }

  @Get('/leaderboard')
  @UseGuards(VisitorGuard)
  @ApiOperation({ description: '리더보드 조회' })
  async getLeaderBoard(@Jwt() cu: CurrentUser) {
    return await this.userService.getLeaderBoard(cu.no);
  }

  @Put('/leaderboard')
  @UseGuards(VisitorGuard)
  @ApiOperation({ description: '리더보드 정보수정' })
  async putLeaderBoard(@Jwt() cu: CurrentUser, @Body() userLeaderBoardModifyDto: UserLeaderBoardDto) {
    return await this.userService.putLeaderBoard(cu.no, userLeaderBoardModifyDto);
  }

  @Post('/leaderboard')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: '리더보드 등록' })
  async createLeaderBoard(@Jwt() cu: CurrentUser, @Body() userLeaderBoardCreateDto: UserLeaderBoardDto) {
    return await this.userService.createLeaderBoard(cu.no, userLeaderBoardCreateDto)
  }

  @Post('/init')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: '데이터 초기화' })
  async initData(@Jwt() cu: CurrentUser, @Body('data') data: string) {
    return await this.userService.initData(data, cu.no);
  }
}