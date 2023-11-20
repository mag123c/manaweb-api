import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards, Request, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Jwt } from 'src/common/decorator/CurrentUserDecorator';
import CurrentUser from '../auth/dto/currentUser.dto';
import UserInvestmentDataPutDto from './dto/user-investmentData.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UserLeaderBoardCreateDto } from './dto/user-leardboard.dto';
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
  async getLeaderBoard() {
    return await this.userService.getLeaderBoard();
  }

  @Post('/leaderboard')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: '리더보드 등록' })
  async createLeaderBoard(@Jwt() cu: CurrentUser, @Body() userLeaderBoardCreateDto: UserLeaderBoardCreateDto) {
    return await this.userService.createLeaderBoard(cu.no, userLeaderBoardCreateDto)
  }

  @Post('/initData')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: '데이터 초기화' })
  async initData(@Jwt() cu: CurrentUser) {
    console.log(cu);
    return await this.userService.initData(cu.no);
  }
}