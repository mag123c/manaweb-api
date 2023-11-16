import { DynamicModule, Global } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { createLoggerProviders } from './logger.provider';

@Global()
export class LoggerModule {
  static forRoot(): DynamicModule {
    const prefixedLoggerProviders = createLoggerProviders();
    return {
      module: LoggerModule,
      providers: [LoggerService, ...prefixedLoggerProviders],
      exports: [LoggerService, ...prefixedLoggerProviders],
    };
  }
}
