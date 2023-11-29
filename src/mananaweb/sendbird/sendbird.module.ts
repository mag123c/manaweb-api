import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendbirdChatbotController } from './groupchat/chatbot/sendbird.chatbot.controller';
import { SendbirdMessageController } from './groupchat/message/sendbird.message.controller';
import { SendbirdChatbotService } from './groupchat/chatbot/sendbird.chatbot.service';
import { SendbirdMessageService } from './groupchat/message/sendbird.message.service';
import { SendbirdUserProvider } from './sendbird.provider';
import { SendbirdUserEntity } from './entity/sendbird.userinfo.entity';
import { SendbirdUserController } from './groupchat/user/sendbird.user.controller';
import { SendbirdChannelController } from './groupchat/channel/sendbird.channel.controller';
import { SendbirdUserService } from './groupchat/user/sendbird.user.service';
import { SendbirdChannelService } from './groupchat/channel/sendbird.channel.service';
import { SendbirdUserRepository } from './groupchat/user/sendbird.user.repository';


@Module({
  controllers: [
    SendbirdUserController,
    SendbirdChannelController,
    SendbirdChatbotController,
    SendbirdMessageController,
],
  exports: [
    SendbirdUserProvider,
    SendbirdUserService,
    SendbirdChannelService,
    SendbirdChatbotService,
    SendbirdMessageService,
],
  providers: [
    SendbirdUserProvider,
    SendbirdUserService,
    SendbirdChannelService,
    SendbirdChatbotService,
    SendbirdMessageService,

    SendbirdUserRepository,
    ],
  imports: [
    TypeOrmModule.forFeature([
      SendbirdUserEntity,
    ]), 
  ]
})

export class SendbirdModule {}