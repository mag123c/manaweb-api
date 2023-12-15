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

    async updateReadStatus(webId: string, channelUrl: string) {
        return await this.createQueryBuilder()
            .update()
            .set({
                read: true,                
            })
            .where("channelUrl = :channelUrl", { channelUrl })
            .andWhere('userId = :webId', { webId })            
            .execute();
    }
}