import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { setupSwagger } from './util/swagger.setup';
import { HttpExceptionFilter } from './exception/expection.filter';

async function bootstrap() {
  process.env.TZ = 'Asia/Seoul';
  const app = await NestFactory.create(AppModule,
    {
      cors: true,
      bufferLogs: true,
    }
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  setupSwagger(app);
  await app.listen(3065, () => {
    console.log('server running');
  });
}

bootstrap();
