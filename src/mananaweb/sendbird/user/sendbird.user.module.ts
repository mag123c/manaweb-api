import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendbirdUserController } from './sendbird.user.controller';
import { SendbirdUserService } from './sendbird.user.service';

@Module({
  controllers: [SendbirdUserController],
  exports: [SendbirdUserService],
  providers: [SendbirdUserService],
  imports: [
    TypeOrmModule.forFeature([]), 
  ]
})

export class SendbirdUserModule {}