import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SendbirdUserEntity } from '../entity/sendbird.userinfo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SendbirdUserRepository extends Repository<SendbirdUserEntity> {
    constructor(@InjectRepository(SendbirdUserEntity) private dataSource: DataSource) {
        super(SendbirdUserEntity, dataSource.manager);
    }

    async findByUserId(userId: string) {
        return await this.createQueryBuilder()
            .where('userId = :userId', { userId })
            .getOne();
    }

    async saveUser(userEntity: SendbirdUserEntity): Promise<SendbirdUserEntity> {
        return await this.createQueryBuilder()
            .insert()
            .into(SendbirdUserEntity)
            .values(userEntity)
            .execute()
            .then(result => result.raw[0]);
    }
}