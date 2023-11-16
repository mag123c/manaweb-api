import { fromLoggers } from './logger.decorator';
import { Provider } from '@nestjs/common';
import { LoggerService } from './logger.service';

function loggerFactory(logger: LoggerService, from: string) {
  if (from) {
    logger.init(from);
  }
  return logger;
}

function createLoggerProvider(from: string): Provider<LoggerService> {
  return {
    provide: `LoggerService${from}`,
    useFactory: (loggerServiceFromInject) => loggerFactory(loggerServiceFromInject, from),
    inject: [LoggerService],
  };
}

export function createLoggerProviders(): Array<Provider<LoggerService>> {
  return fromLoggers.map((prefix) => createLoggerProvider(prefix));
}
