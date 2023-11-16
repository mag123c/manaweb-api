import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendbirdChannelController } from './sendbird.channel.controller';
import { SendbirdChannelService } from './sendbird.channel.service';
import { SendbirdMessageService } from '../message/sendbird.message.service';

@Module({
  controllers: [SendbirdChannelController],
  exports: [SendbirdChannelService],
  providers: [SendbirdChannelService, SendbirdMessageService],
  imports: [
    TypeOrmModule.forFeature([]), 
  ]
})

export class SendbirdChannelModule {}