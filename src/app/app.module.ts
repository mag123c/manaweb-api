import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
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
import { GlobalExceptionFilter } from 'src/exception/expection.filter';
import { ErrorHistoryModule } from 'src/error/errorhistory.module';
import { ErrorHistoryEntity } from 'src/error/entity/errorhistory.entity';
import { ImitationModule } from 'src/investing/imitation/imitation.module';
import { UserModule } from 'src/user/user.module';
import { SendbirdUserModule } from 'src/sendbird/user/sendbird.user.module';
import { SendbirdMessageModule } from 'src/sendbird/message/sendbird.message.module';
import { SendbirdChannelModule } from 'src/sendbird/channel/sendbird.channel.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/user/entity/user.entity';
import { SendbirdChatbotModule } from 'src/sendbird/chatbot/sendbird.chatbot.module';
import Joi from 'joi';


@Module({
  imports: [
    //business
    CalculatorModule,
    ImitationModule,
    SuggestionModule,
    UserModule,
    AuthModule,

    //logging && history
    ErrorHistoryModule,
    LogModule,   

    //sendbird test version
    SendbirdUserModule,
    SendbirdMessageModule,
    SendbirdChannelModule,
    SendbirdChatbotModule,

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
      logging: true,
      // logging: process.env.NODE_ENV == 'development',
      entities: [
        UserVisitEntity,
        UserClickEntity,
        SuggestionEntity,
        ErrorHistoryEntity,
        UserEntity,
      ],
      synchronize: false,
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {
}
function getEnvFileName() {  
  let code = process.env.NODE_ENV;
  return code == 'dev' ?
  '.env.dev'
  : code == 'production'
  ? '.env.production'
  : '.env';
}