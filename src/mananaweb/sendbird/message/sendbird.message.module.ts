import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendbirdMessageController } from './sendbird.message.controller';
import { SendbirdMessageService } from './sendbird.message.service';

@Module({
  controllers: [SendbirdMessageController],
  exports: [SendbirdMessageService],
  providers: [SendbirdMessageService],
  imports: [
    TypeOrmModule.forFeature([]), 
  ]
})

export class SendbirdMessageModule {}