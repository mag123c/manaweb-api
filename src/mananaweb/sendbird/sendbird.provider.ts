// sendbird.provider.ts
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sendbird from 'sendbird-platform-sdk-typescript';

export const SEND_BIRD_PROVIDER = 'SEND_BIRD_PROVIDER';

export const SendbirdUserProvider: Provider = {
  provide: SEND_BIRD_PROVIDER,
  useFactory: (configService: ConfigService) => {
    const APP_ID = configService.get('SENDBIRD_APP_ID');
    const API_TOKEN = configService.get('SENDBIRD_API_TOKEN');
    const IBOT_ID = configService.get('IBOT_ID');


    const serverConfig = new sendbird.ServerConfiguration(`https://api-${APP_ID}.sendbird.com`, { "app_id": APP_ID });
    const configuration = sendbird.createConfiguration({ baseServer: serverConfig });
    const sendbirdUserAPI = new sendbird.UserApi(configuration);
    const sendbirdMessageAPI = new sendbird.MessageApi(configuration);
    const sendbirdChannelAPI = new sendbird.GroupChannelApi(configuration);
    const sendbirdChatBotAPI = new sendbird.BotApi(configuration);


    return {
        sendbirdUserAPI: sendbirdUserAPI,
        sendbirdMessageAPI: sendbirdMessageAPI,
        sendbirdChannelAPI: sendbirdChannelAPI,
        sendbirdChatBotAPI: sendbirdChatBotAPI,
        API_TOKEN: API_TOKEN,
        IBOT_ID: IBOT_ID,
     };
  },
  inject: [ConfigService],
};
