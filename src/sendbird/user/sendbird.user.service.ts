import { Injectable } from '@nestjs/common';
import * as sendbird from 'sendbird-platform-sdk-typescript';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/sendbird.user.dto';

@Injectable()
export class SendbirdUserService {
    APP_ID: string;
    API_TOKEN: string;
    serverConfig: sendbird.ServerConfiguration<{app_id: string}>;
    configuration: sendbird.Configuration;
    userAPI: sendbird.UserApi;

    constructor(
        private readonly configService: ConfigService,
    ){
        this.APP_ID = this.configService.get('SENDBIRD_APP_ID');
        this.API_TOKEN = this.configService.get('SENDBIRD_API_TOKEN');
        this.serverConfig = new sendbird.ServerConfiguration(`https://api-${this.APP_ID}.sendbird.com`, { "app_id": this.APP_ID });
        this.configuration = sendbird.createConfiguration({ baseServer: this.serverConfig });
        this.userAPI = new sendbird.UserApi(this.configuration);
    }

    /**
     * 
     */
    async userList() {
        try {
            const users = await this.userAPI.listUsers(this.API_TOKEN, '', 10);
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
    async createUser (createUserDto: CreateUserDto) {
        const userData: sendbird.CreateUserData = {
            userId: createUserDto.userId,
            nickname: createUserDto.nickname,
            profileUrl: createUserDto.profileURL
        }
        
        try {
            const user = await this.userAPI.createUser(this.API_TOKEN, userData)
            return user;
        } catch(error) {
            throw new sendbird.HttpException('createUser');
        }
    }
}