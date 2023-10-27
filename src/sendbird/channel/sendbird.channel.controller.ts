import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendbirdChannelService } from './sendbird.channel.service';
import { ConfigService } from '@nestjs/config';

@ApiTags('sendbird')
@Controller('/api/v1/sendbird/channel')
export class SendbirdChannelController {
  constructor
    (
      private sendbirdChannelService: SendbirdChannelService,
    ){}

}
