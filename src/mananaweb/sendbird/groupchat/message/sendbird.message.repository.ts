import { Injectable } from '@nestjs/common';
import { DataSource, InsertResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SendbirdUserEntity } from '../../entity/sendbird.userinfo.entity';
import { SendbirdUserChannelEntity } from '../../entity/sendbird.userchannel.entity';
import { SendbirdUserMessageEntity } from '../../entity/sendbird.usermessage.entity';

@Injectable()
export class SendbirdMessageRepository extends Repository<SendbirdUserMessageEntity> {
    constructor
        (
            @InjectRepository(SendbirdUserChannelEntity)
            private dataSource: DataSource
        ) {
        super(SendbirdUserMessageEntity, dataSource.manager);
    }


}