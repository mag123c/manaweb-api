import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorHistoryService } from 'src/common/error/errorhistory.service';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    // private errorHistoryService: ErrorHistoryService,
  ) {}
  
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    let message = exception.response?.message || exception.message || 'UNKNOWN';
    if (Array.isArray(message)) {
      message = message.reduce((acc, mesa) => (acc += mesa + ','), '');
    }

    // if(process.env.NODE_ENV === 'production') {
    //   this.errorService.saveHistory(message, request?.url);
    // }

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
  }
}