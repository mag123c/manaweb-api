import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { setupSwagger } from './util/swagger.setup';
import { ErrorsInterceptor } from './interceptor/exception.interceptor';
import expressBasicAuth from 'express-basic-auth';
import { GlobalExceptionFilter } from './exception/expection.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  process.env.TZ = 'Asia/Seoul';
  const app = await NestFactory.create(AppModule,
    {
      cors: true,
      bufferLogs: true,
    }
  );

  app.useGlobalInterceptors(new ErrorsInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  require('dotenv').config();

  app.use( //이 부분 추가
    ['/swagger/swagger-ui'], // docs(swagger end point)에 진입시
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD, // 지정된 ID/비밀번호
      },
    }),
  );
  setupSwagger(app);


  await app.listen(3065, () => {
    console.log('server running');
  });
}

bootstrap();
