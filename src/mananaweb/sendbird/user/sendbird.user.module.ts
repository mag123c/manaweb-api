import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendbirdUserController } from './sendbird.user.controller';
import { SendbirdUserService } from './sendbird.user.service';
import { SendbirdUserRepository } from './sendbird.user.repository';
import { SendbirdUserEntity } from '../entity/sendbird.userinfo.entity';

@Module({
  controllers: [SendbirdUserController],
  exports: [SendbirdUserService],
  providers: [SendbirdUserService, SendbirdUserRepository],
  imports: [
    TypeOrmModule.forFeature([
      SendbirdUserEntity,
    ]), 
  ]
})

export class SendbirdUserModule {}