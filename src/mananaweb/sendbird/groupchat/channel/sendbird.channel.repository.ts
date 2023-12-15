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
                channelCreateId: entity.channelCreateId,
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

    //고객입장이기 때문에 withId로 테이블 조회하면됨.
    // 테스트단계에서 아이웨딩 계정에 대한 테스트 통합해서 진행 -> 나중에 withId만으로 수정 필요
    async findByUserId(withId: string) {
        return await this.createQueryBuilder('channel')
            .where('channel.withId = :withId', { withId })
            .getMany();
    }
}