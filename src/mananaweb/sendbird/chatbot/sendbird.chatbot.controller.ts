import { Controller, Get } from '@nestjs/common';
import { SendbirdChatbotService } from './sendbird.chatbot.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('ai chatbots')
@Controller('/sendbird/chatbot')
export class SendbirdChatbotController {
    constructor(private sendbirdChatbotService: SendbirdChatbotService){}

    @Get('bots')
    @ApiOperation({ description: 'list' })
    async getBotList() {
        return this.sendbirdChatbotService.getBotList();
    }
}
