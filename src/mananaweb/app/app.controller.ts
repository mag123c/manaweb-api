import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('health check')
  @Get('health')
    checkHealth() {
      console.log('hello')
      return { status: 'ok' };
  }
}