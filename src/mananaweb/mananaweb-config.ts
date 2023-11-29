import { ConfigService } from "@nestjs/config";
import { UserClickEntity } from "src/common/log/entity/userClick.entity";
import { UserVisitEntity } from "src/common/log/entity/userVisit.entity";
import { SuggestionEntity } from "./suggestion/entity/suggestion.entity";
import { ErrorHistoryEntity } from "src/common/error/entity/errorhistory.entity";
import { UserEntity } from "./user/entity/user.entity";
import { PnlUserEntity } from "./investing/my/entity/pnl_user.entity";
import { PnlUserProfitEntity } from "./investing/my/entity/pnl_user_profit.entity";
import { UserInvestmentDataEntity } from "./user/entity/user-investment.entity";
import { UserInvestmentLeaderBoardEntity } from "./user/entity/user-investment-leaderboard.entity";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const mananawebConnection = (configService: ConfigService) =>
({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: +configService.get<number>('PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    useUTC: false,
    timezone: 'Z',
    // logging: false,
    logging: process.env.NODE_ENV == 'dev',
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
    namingStrategy: new SnakeNamingStrategy(),
    autoLoadEntities: true

} as TypeOrmModuleOptions);