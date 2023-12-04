// sendbird.provider.ts
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sendbird from 'sendbird-platform-sdk-typescript';

export const MAP_PROVIDER = 'MAP_PROVIDER';

export const MapProvider: Provider = {
  provide: MAP_PROVIDER,
  useFactory: (configService: ConfigService) => {
    const CLIENT_ID = configService.get('NAVER_CLIENT_ID');
    const CLIENT_SECRET = configService.get('NAVER_CLIENT_SECRET');
    const API_URL = 'https://openapi.naver.com/v1/search/local.json?query=';

    return {
        CLIENT_ID: CLIENT_ID,
        CLIENT_SECRET: CLIENT_SECRET,
        API_URL: API_URL,
     };
  },
  
  inject: [ConfigService],
};
