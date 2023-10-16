import {
    CallHandler,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  import MyLogger from '../logger/MyLogger';
  import { now } from '../util/DateUtil';
  
  //에러 전처리
  
  @Injectable()
  export class ErrorsInterceptor implements NestInterceptor {
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        catchError((exception) => {
          const className = context.getClass();
          const methodName = context.getHandler();
          const request = context.getArgByIndex(0);
          const cookies = request.cookies;
          const user = request.user;
          const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
          const status =
            exception instanceof HttpException
              ? exception.getStatus()
              : HttpStatus.INTERNAL_SERVER_ERROR;
          const message = exception.message || 'UNKNOWN';
          const authorization = request.headers.authorization;
  
          MyLogger.error({
            statusCode: status,
            timestamp: now().toISOString(),
            path: request.url,
            ip,
            message: message,
            className: className.name,
            methodName: methodName.name,
            stack: exception.stack,
            cookies,
            user: user,
            authorization: authorization,
          });
  
          const formatMessage = {
            statusCode: status,
            timestamp: now().toISOString(),
            path: request.url,
            ip,
            message: message,
            className: className.name,
            methodName: methodName.name,
            stack: exception.stack,
            cookies,
            user: user,
            authorization: authorization,
          };  

          throw exception;
        }),
      );
    }
}