// import { ConfigService } from '@nestjs/config';
// import * as sendbird from 'sendbird-platform-sdk-typescript';

// export class SendbirdBasicField{
//     APP_ID: string;
//     API_TOKEN: string;
//     serverConfig: sendbird.ServerConfiguration<{ app_id: string }>;
//     configuration: sendbird.Configuration;
//     sendbirdAPI: any;

//     constructor(private readonly configService: ConfigService) {
//         this.APP_ID = this.configService.get('SENDBIRD_APP_ID');
//         this.API_TOKEN = this.configService.get('SENDBIRD_API_TOKEN');
//         this.serverConfig = new sendbird.ServerConfiguration(`https://api-${this.APP_ID}.sendbird.com`, { "app_id": this.APP_ID });
//         this.configuration = sendbird.createConfiguration({ baseServer: this.serverConfig });
//     }

//     sendbirdAPISet(params: string) {
//         switch(params) {
//             case 'user':
//                 this.sendbirdAPI = new sendbird.UserApi(this.configuration);
//                 break;
//             case 'message':
//                 break;
//             case 'channel':
//                 break;
//             default:
//                 break;
//         }
//     }
// }