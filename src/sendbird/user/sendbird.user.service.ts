import { Injectable } from '@nestjs/common';
import * as sendbird from 'sendbird-platform-sdk-typescript';
import { ConfigService } from '@nestjs/config';
import { SendbirdCreateUserDto } from './entity/dto/sendbird.user.dto';

@Injectable()
export class SendbirdUserService {
    APP_ID: string;
    API_TOKEN: string;
    serverConfig: sendbird.ServerConfiguration<{app_id: string}>;
    configuration: sendbird.Configuration;
    sendbirdAPI: sendbird.UserApi;

    constructor(
        private readonly configService: ConfigService,
    ){
        this.APP_ID = this.configService.get('SENDBIRD_APP_ID');
        this.API_TOKEN = this.configService.get('SENDBIRD_API_TOKEN');
        this.serverConfig = new sendbird.ServerConfiguration(`https://api-${this.APP_ID}.sendbird.com`, { "app_id": this.APP_ID });
        this.configuration = sendbird.createConfiguration({ baseServer: this.serverConfig });
        this.sendbirdAPI = new sendbird.UserApi(this.configuration);
    }

    /**
     * 
     */
    async userList() {
        try {
            const users = await this.sendbirdAPI.listUsers(this.API_TOKEN, '', 10);
            console.log(users.users);
            return users.users;
        } catch (error) {
            throw new sendbird.HttpException('userList');
        }
    }

    /**
     * 
     * @param userId 
     * @param nickname 
     * @param profileUrl 
     */
    async createUser (createUserDto: SendbirdCreateUserDto) {
        const userData: sendbird.CreateUserData = {
            userId: createUserDto.userId,
            nickname: createUserDto.nickname,
            profileUrl: createUserDto.profileURL
        }
        
        try {
            const user = await this.sendbirdAPI.createUser(this.API_TOKEN, userData)
            return user;
        } catch(error) {
            throw new sendbird.HttpException('createUser');
        }
    }
}