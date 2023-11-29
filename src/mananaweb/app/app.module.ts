import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CalculatorModule } from 'src/mananaweb/calculator/calculator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModule } from 'src/common/log/log.module';
import { SuggestionModule } from 'src/mananaweb/suggestion/suggestion.module';
import { GlobalExceptionFilter } from 'src/common/exception/expection.filter';
import { ErrorHistoryModule } from 'src/common/error/errorhistory.module';
import { ImitationModule } from 'src/mananaweb/investing/imitation/imitation.module';
import { UserModule } from 'src/mananaweb/user/user.module';
import { AuthModule } from 'src/mananaweb/auth/auth.module';
import Joi from 'joi';
import { PnlModule } from 'src/mananaweb/investing/my/pnl.module';
import { mananawebConnection } from '../mananaweb-config';
import { sendbirdConnection } from '../sendbird-config';
import { SendbirdModule } from '../sendbird/sendbird.module';


@Module({
  imports: [
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
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: mananawebConnection,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: sendbirdConnection,      
    }),
    
    //business
    CalculatorModule,
    ImitationModule,
    SuggestionModule,
    UserModule,
    AuthModule,
    PnlModule,

    //logging && history
    ErrorHistoryModule,
    LogModule,   

    //sendbird test version
    SendbirdModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})

export class MananawebAppModule {}

function getEnvFileName() {  
  let code = process.env.NODE_ENV;
  return code == 'dev' ?
  '.env.dev'
  : code == 'production'
  ? '.env.production'
  : '.env';
}