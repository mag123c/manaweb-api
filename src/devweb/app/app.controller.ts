import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DevAppService } from './app.service';

@Controller('dev')
export class DevAppController {
  constructor(private readonly appService: DevAppService) {}

  @ApiTags('health check')
  @Get('health')
    checkHealth() {
      return { status: 'ok' };
  }
}