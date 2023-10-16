import { createLogger, format, transports } from 'winston';
import * as rotate from 'winston-daily-rotate-file';
import { now } from '../util/DateUtil';

const jsonFormatter = format.printf((logEntry) => {
  if (logEntry.level == 'info') {
    const msg = logEntry.message as any;
    const r = JSON.stringify({ timestamp: now(), level: logEntry.level, ...msg });
    return r.toString();
  }
  return JSON.stringify(logEntry);
});

const MyLogger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    jsonFormatter,
    format.json(),
  ),

  transports: [
    new transports.File({
      filename: './logs/error_log.log',
      level: 'error',
    }),
    new transports.File({
      filename: './logs/debug_log.log',
      level: 'debug',
    }),
    new transports.Console({ level: 'error' }),

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

export default MyLogger;
