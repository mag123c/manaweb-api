import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CalculatorModule } from 'src/mananaweb/calculator/calculator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModule } from 'src/common/log/log.module';
import { UserVisitEntity } from 'src/common/log/entity/userVisit.entity';
import { UserClickEntity } from 'src/common/log/entity/userClick.entity';
import { SuggestionEntity } from 'src/mananaweb/suggestion/entity/suggestion.entity';
import { SuggestionModule } from 'src/mananaweb/suggestion/suggestion.module';
import { GlobalExceptionFilter } from 'src/common/exception/expection.filter';
import { ErrorHistoryModule } from 'src/common/error/errorhistory.module';
import { ErrorHistoryEntity } from 'src/common/error/entity/errorhistory.entity';
import { ImitationModule } from 'src/mananaweb/investing/imitation/imitation.module';
import { UserModule } from 'src/mananaweb/user/user.module';
import { SendbirdUserModule } from 'src/mananaweb/sendbird/user/sendbird.user.module';
import { SendbirdMessageModule } from 'src/mananaweb/sendbird/message/sendbird.message.module';
import { SendbirdChannelModule } from 'src/mananaweb/sendbird/channel/sendbird.channel.module';
import { AuthModule } from 'src/mananaweb/auth/auth.module';
import { UserEntity } from 'src/mananaweb/user/entity/user.entity';
import { SendbirdChatbotModule } from 'src/mananaweb/sendbird/chatbot/sendbird.chatbot.module';
import Joi from 'joi';
import { PnlModule } from 'src/mananaweb/investing/my/pnl.module';
import { PnlUserEntity } from 'src/mananaweb/investing/my/entity/pnl_user.entity';
import { PnlUserProfitEntity } from 'src/mananaweb/investing/my/entity/pnl_user_profit.entity';
import { UserInvestmentDataEntity } from 'src/mananaweb/user/entity/user-investment.entity';
import { UserInvestmentLeaderBoardEntity } from '../user/entity/user-investment-leaderboard.entity';


@Module({
  imports: [
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
      timezone: 'Z',
      logging: false,
      // logging: process.env.NODE_ENV == 'dev',
      entities: [
        UserVisitEntity,
        UserClickEntity,
        SuggestionEntity,
        ErrorHistoryEntity,
        UserEntity,
        PnlUserEntity,
        PnlUserProfitEntity,
        UserInvestmentDataEntity,
        UserInvestmentLeaderBoardEntity,
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

export class MananawebAppModule {}

function getEnvFileName() {  
  let code = process.env.NODE_ENV;
  return code == 'dev' ?
  '.env.dev'
  : code == 'production'
  ? '.env.production'
  : '.env';
}