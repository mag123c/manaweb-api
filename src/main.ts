import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { setupSwagger } from './util/swagger.setup';

async function bootstrap() {
  // const allowedOrigins = [
  //   'http://localhost:3000',   
  //   'http://localhost:6800',
  // ];
  process.env.TZ = 'Asia/Seoul';
  const app = await NestFactory.create(AppModule, { cors: true });
  setupSwagger(app);
  await app.listen(8080);
}
bootstrap();
