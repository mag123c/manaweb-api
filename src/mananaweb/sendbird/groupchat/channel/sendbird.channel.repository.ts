import { Injectable } from '@nestjs/common';
import { DataSource, InsertResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SendbirdUserEntity } from '../../entity/sendbird.userinfo.entity';
import { SendbirdUserChannelEntity } from '../../entity/sendbird.userchannel.entity';
import { getUnixTime } from 'src/common/util/DateUtil';

@Injectable()
export class SendbirdChannelRepository extends Repository<SendbirdUserChannelEntity> {
    constructor
        (
            @InjectRepository(SendbirdUserChannelEntity)
            private dataSource: DataSource
        ) {
        super(SendbirdUserChannelEntity, dataSource.manager);
    }

    async saveChannel(entity: SendbirdUserChannelEntity): Promise<InsertResult> {
        return await this.createQueryBuilder()
            .insert()
            .into(SendbirdUserChannelEntity)
            .values({
                withId: entity.withId,
                userId: entity.userId,
                channelUrl: entity.channelUrl,
                createdAt: getUnixTime(),
            })
            .execute();

    }

    async updateChannel(entity: SendbirdUserChannelEntity) {
        return await this.createQueryBuilder()
            .update()
            .set({
                lastMessageMessage: entity.lastMessageMessage,
                lastMessageSenderUserId: entity.lastMessageSenderUserId,
                lastMessageCreatedAt: entity.lastMessageCreatedAt,
                createdAt: entity.createdAt
            })
            .where("channelUrl = :url", { url: entity.channelUrl })
            .execute();
    }

    async findByUserId(userId: string) {
        return await this.createQueryBuilder()
            .where('userId = :userId', { userId })
            .getMany();
    }
}