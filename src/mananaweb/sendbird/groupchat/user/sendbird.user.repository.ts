import { Injectable } from '@nestjs/common';
import { DataSource, InsertResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SendbirdUserEntity } from '../../entity/sendbird.userinfo.entity';

@Injectable()
export class SendbirdUserRepository extends Repository<SendbirdUserEntity> {
    constructor
        (
            @InjectRepository(SendbirdUserEntity)
            private dataSource: DataSource
        ) {
        super(SendbirdUserEntity, dataSource.manager);
    }

    async findByUserId(userId: string) {
        return await this.createQueryBuilder()
            .where('userId = :userId', { userId })
            .getOne();
    }

    async saveUser(userEntity: SendbirdUserEntity): Promise<InsertResult> {
        console.log(userEntity);
        return await this.createQueryBuilder()
            .insert()
            .into(SendbirdUserEntity)
            .values({
                withId: userEntity.withId,
                userId: userEntity.userId,
                nickname: userEntity.nickname,
                accessToken: userEntity.accessToken,
                expirationTime: userEntity.expirationTime,
                createTime: userEntity.createTime,
            })
            .execute();
    }

    async updateUser(userEntity: SendbirdUserEntity) {
        return await this.createQueryBuilder()
            .insert()
            .update(SendbirdUserEntity)
            .set({
                accessToken: userEntity.accessToken,
                expirationTime: userEntity.expirationTime,
            })
            .where('userId = :userId', { userId: userEntity.userId })
            .execute();
    }
}