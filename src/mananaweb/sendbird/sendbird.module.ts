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
import { SendbirdChannelRepository } from './groupchat/channel/sendbird.channel.repository';
import { SendbirdUserChannelEntity } from './entity/sendbird.userchannel.entity';
import { SendbirdUserMessageEntity } from './entity/sendbird.usermessage.entity';
import { SendbirdMessageRepository } from './groupchat/message/sendbird.message.repository';
import { SendbirdCommonService } from './groupchat/sendbird-common.service';
import { SendbirdCommonController } from './groupchat/sendbird-common.controller';


@Module({
  controllers: [
    SendbirdUserController,
    SendbirdChannelController,
    SendbirdChatbotController,
    SendbirdMessageController,
    SendbirdCommonController,
  ],
  exports: [
    SendbirdUserProvider,
    SendbirdUserService,
    SendbirdChannelService,
    SendbirdChatbotService,
    SendbirdMessageService,
    SendbirdCommonService,
  ],
  providers: [
    SendbirdUserProvider,
    SendbirdUserService,
    SendbirdChannelService,
    SendbirdChatbotService,
    SendbirdMessageService,
    SendbirdCommonService,

    SendbirdUserRepository,
    SendbirdChannelRepository,
    SendbirdMessageRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([
      SendbirdUserEntity,
      SendbirdUserChannelEntity,
      SendbirdUserMessageEntity,
    ]),
  ]
})

export class SendbirdModule { }