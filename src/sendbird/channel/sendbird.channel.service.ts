import { Injectable } from '@nestjs/common';
import sendbird from 'sendbird-platform-sdk-typescript';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SendbirdChannelService {
    APP_ID: string;
    API_TOKEN: string;
    serverConfig: sendbird.ServerConfiguration<{app_id: string}>;
    configuration: sendbird.Configuration;
    sendbirdAPI: sendbird.GroupChannelApi;

    constructor(
        private readonly configService: ConfigService,
    ){
        this.APP_ID = this.configService.get('SENDBIRD_APP_ID');
        this.API_TOKEN = this.configService.get('SENDBIRD_API_TOKEN');
        this.serverConfig = new sendbird.ServerConfiguration(`https://api-${this.APP_ID}.sendbird.com`, { "app_id": this.APP_ID });
        this.configuration = sendbird.createConfiguration({ baseServer: this.serverConfig });
        this.sendbirdAPI = new sendbird.GroupChannelApi(this.configuration);
    }

    async createChannel() {
        try {
            const channel = await this.sendbirdAPI.gcCreateChannel(this.API_TOKEN, { userIds: ['test1'], operatorIds: ['admin'] });
            console.log(channel.channel)
            return channel.channel;
        } catch (error) {
            throw new sendbird.HttpException('createChannel');
        }        
    }

    async getChannelList() {
        try {
            const channelList = await this.sendbirdAPI.gcListChannels(this.API_TOKEN);
            console.log(channelList);
            return channelList;
        } catch (error) {
            throw new sendbird.HttpException('getChannelList');
        }
    }
}