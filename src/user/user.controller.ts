import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards, Request, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Jwt } from 'src/decorator/CurrentUserDecorator';
import CurrentUser from 'src/auth/dto/currentUser.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import UserInvestmentDataPutDto from './dto/user-investmentData.dto';

@ApiTags('user')
@Controller('/api/v1/user')
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
}