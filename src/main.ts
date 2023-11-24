import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { setupSwagger } from './common/util/swagger.setup';
import { ErrorsInterceptor } from './common/interceptor/exception.interceptor';
import expressBasicAuth from 'express-basic-auth';
import { GlobalExceptionFilter } from './common/exception/expection.filter';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  process.env.TZ = 'Asia/Seoul';
  const app = await NestFactory.create(AppModule,
    {
      bufferLogs: true,
    }
  );

  app.enableCors({
    origin: [
      'https://mananaweb.net', 'https://dev.mananaweb.net', 'dev.mananaweb.net', 'http://dev.mananaweb.net',
      'http://localhost:3000', 'http://localhost:3001',
      'http://172.1.0.1:8082', 'http://172.1.0.1:8081'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    exposedHeaders: ['Authorization'],
  })

  //API 경로 접두어 및 버전관리
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })

  app.use(cookieParser());
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
