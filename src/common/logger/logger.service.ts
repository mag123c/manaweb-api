import { Global, Injectable, Scope } from '@nestjs/common';
import winston, { createLogger, format, Logger, transports } from 'winston';
import rotate from 'winston-daily-rotate-file';

@Injectable({
  scope: Scope.TRANSIENT,
})
@Global()
export class LoggerService {
  logger: Logger;

  init(fromClass: any) {
    this.logger = createLogger({
      defaultMeta: { from: fromClass?.name || '' },
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.simple(),
        format.colorize(),
      ),
      transports: [
        new transports.File({
          filename: './logs/error_log.log',
          level: 'error',
        }),
        new transports.File({ filename: './logs/common_log.log' }),
        new rotate({
          filename: '%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
          dirname: 'logs',
        }),
      ],
    });
  }
  debug(message: any) {
    this.logger.debug(message);
  }
  info(message: any) {
    this.logger.info(message);
  }

  error(message: any) {
    this.logger.error(message);
  }
}
