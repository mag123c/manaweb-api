import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendbirdMessageService } from './sendbird.message.service';
import { ConfigService } from '@nestjs/config';

@ApiTags('sendbird')
@Controller('/api/v1/sendbird/channel')
export class SendbirdMessageController {
  constructor
    (
      private sendbirdMessageService: SendbirdMessageService,
    ){}

}
