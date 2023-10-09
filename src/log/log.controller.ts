import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { LogService } from './log.service';

@Controller('/api/v1/log')
export class LogController {
  constructor(private logService: LogService) {}

  @Post('/add-visit')
  async addVisit(@Req() req, @Body() body: { url: string }) {
    this.logService.addVisitLog(req, body.url);
  }

  @Post('/calculate')
  async addCalculate(@Body() body: { url: string }) {
    this.logService.addCalculateLog(body.url);
  }  
}
