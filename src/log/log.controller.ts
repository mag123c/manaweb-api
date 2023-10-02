import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { LogService } from './log.service';

@Controller('/api/v1/log')
export class LogController {
  constructor(private logService: LogService) {}

  @Post('/add-visit')
  async addVisit(@Req() req) {
    this.logService.addVisitLog(req);
  }

  @Post('/calculate')
  async addCalculate(@Req() req) {
    this.logService.addCalculateLog(req);
  }  
}
