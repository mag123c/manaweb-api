import { Injectable } from '@nestjs/common';
import * as sendbird from 'sendbird-platform-sdk-typescript';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SendbirdChannelService {
    APP_ID: string;
    API_TOKEN: string;
    serverConfig: sendbird.ServerConfiguration<{app_id: string}>;
    configuration: sendbird.Configuration;
    openChannelAPI: sendbird.OpenChannelApi;

    constructor(
        private readonly configService: ConfigService,
    ){
        this.APP_ID = this.configService.get('SENDBIRD_APP_ID');
        this.API_TOKEN = this.configService.get('SENDBIRD_API_TOKEN');
        this.serverConfig = new sendbird.ServerConfiguration(`https://api-${this.APP_ID}.sendbird.com`, { "app_id": this.APP_ID });
        this.configuration = sendbird.createConfiguration({ baseServer: this.serverConfig });
        this.openChannelAPI = new sendbird.OpenChannelApi(this.configuration);
    }

    async openChannel(name: string, url: string, cover_url: string, ) {

    }
}