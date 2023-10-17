import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { LogService } from './log.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('logging')
@Controller('/api/v1/log')
export class LogController {
  constructor(private logService: LogService) {}

  @ApiOperation({ description: '방문 로그' })
  @Post('/add-visit')
  async addVisit(@Req() req, @Body() body: { url: string }) {
    this.logService.addVisitLog(req, body.url);
  }

  @ApiOperation({ description: '무언가 동작 실행' })
  @Post('/calculate')
  async addCalculate(@Body() body: { url: string }) {
    this.logService.addCalculateLog(body.url);
  }  
}
