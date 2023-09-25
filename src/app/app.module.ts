import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CalculatorModule } from 'src/calculator/calculator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    CalculatorModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFileName(),
    }),
    TypeOrmModule.forRootAsync({      
      useFactory: () => ({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: true,
      entities: [join(__dirname, '../**/*.entity.ts')],
      synchronize: true,
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

function getEnvFileName() {  
  let code = process.env.NODE_ENV;
  return code == 'dev' ?
  '.env.dev'
  : code == 'production'
  ? '.env.production'
  : '.env';
  return code == 'staging_prd'
    ? '.env.staging_prd'
    : code == 'staging'
    ? '.env.staging'
    : code == 'docker'
    ? '.env.docker'
    : code === 'dev'
    ? '.env.dev'
    : code === 'production'
    ? '.env.production'
    : '.env.test';
}