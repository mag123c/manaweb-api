import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { setupSwagger } from './util/swagger.setup';

async function bootstrap() {
  process.env.TZ = 'Asia/Seoul';
  const app = await NestFactory.create(AppModule, { cors: true });
  setupSwagger(app);
  await app.listen(3065, () => {
    console.log('server running');
  });
}

bootstrap();
