import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Jwt } from 'src/decorator/CurrentUserDecorator';
import CurrentUser from 'src/auth/dto/currentUser.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

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
    console.log(yyyymm);
    const a = await this.userService.getInvestmentDataByYyyyMm(cu.no, yyyymm);
    console.log(a);
    return a;
  }  
}