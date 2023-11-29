import { ConfigService } from "@nestjs/config";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SendbirdUserEntity } from "./sendbird/entity/sendbird.userinfo.entity";
import { SendbirdUserChannelEntity } from "./sendbird/entity/sendbird.userchannel.entity";
import { SendbirdUserMessageEntity } from "./sendbird/entity/sendbird.usermessage.entity";

export const sendbirdConnection = (configService: ConfigService) =>
({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: +configService.get<number>('PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_SENDBIRD_NAME'),
    useUTC: false,
    timezone: 'Z',
    // logging: false,
    logging: process.env.NODE_ENV == 'dev',
    entities: [
        SendbirdUserEntity,
        SendbirdUserChannelEntity,
        SendbirdUserMessageEntity,
    ],
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
    autoLoadEntities: true

} as TypeOrmModuleOptions);