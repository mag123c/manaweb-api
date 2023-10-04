import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CalculatorModule } from 'src/calculator/calculator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModule } from 'src/log/log.module';
import { UserVisitEntity } from 'src/log/entity/userVisit.entity';
import { UserClickEntity } from 'src/log/entity/userClick.entity';
import { SuggestionEntity } from 'src/suggestion/entity/suggestion.entity';
import { SuggestionModule } from 'src/suggestion/suggestion.module';

@Module({
  imports: [
    CalculatorModule,
    LogModule,
    SuggestionModule,
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
      timezone: process.env.TZ,
      logging: true,
      entities: [UserVisitEntity, UserClickEntity, SuggestionEntity],
      synchronize: false,
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