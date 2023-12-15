import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DevAppController } from './app.controller';
import { DevAppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalExceptionFilter } from 'src/common/exception/expection.filter';
import Joi from 'joi';
import { TechBlogModule } from '../tech-blog/tech-blog.module';
import { MapModule } from '../map/map.module';

@Module({
    imports: [
      TechBlogModule,
      MapModule,
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: getEnvFileName(),
        validationSchema: Joi.object({
          //…
          JWT_SECRET: Joi.string().required(),
          expiresIn: Joi.string().required(),
        }),
      }),
      TypeOrmModule.forRootAsync({      
        useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        useUTC: false,
        timezone: 'Z',
        logging: false,
        // logging: process.env.NODE_ENV == 'dev',
        entities: [
,
        ],
        synchronize: false,
        })
      }),
    ],
    controllers: [DevAppController],
    providers: [DevAppService,
      {
        provide: APP_FILTER,
        useClass: GlobalExceptionFilter,
      },
    ],
  })

export class DevAppModule {
}

function getEnvFileName() {  
  let code = process.env.NODE_ENV;
  return code == 'dev' ?
  '.env.dev'
  : code == 'production'
  ? '.env.production'
  : '.env';
}