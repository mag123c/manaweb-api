import { Module } from '@nestjs/common';
import { SendbirdChatbotService } from './sendbird.chatbot.service';
import { SendbirdChatbotController } from './sendbird.chatbot.controller';

@Module({
  providers: [SendbirdChatbotService],
  controllers: [SendbirdChatbotController]
})
export class SendbirdChatbotModule {}
