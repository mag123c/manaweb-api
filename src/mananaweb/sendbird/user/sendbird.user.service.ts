import { Injectable } from '@nestjs/common';
import * as sendbird from 'sendbird-platform-sdk-typescript';
import { ConfigService } from '@nestjs/config';
import { SendbirdBadRequestException } from '../util/customException';
import { SendbirdUserEntity } from '../entity/sendbird.userinfo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SendbirdUserEntityBuilder } from '../builder/sendbird.userinfo.builder';
import CurrentUser from 'src/mananaweb/auth/dto/currentUser.dto';
import { SendbirdUserRepository } from './sendbird.user.repository';

//sendbird 접속 로직
// (선행 상황 : Front -> Access Token을 가지러 오는 요청 발생)
// 1. 대시보드에 있는 유저일 경우
//  1) 테이블의 유저 정보 조회 > Entity 반환
//  2) User Entity의 Access Token 들고 나감 -> 유저의 Access Token이 인증 가능한 상태    
//   >> 들고 나간 엑세스 토큰이 인증 불가능 상태로 connect 401 반환 시 Update API 요청
//     1) Update User -> Entity 저장
//     2) Update Entity의 Access Token 들고 나감.
// 
// 2. 없는 유저의 경우 (가입 먼저)
//  1) 테이블의 유저 정보 조회 > 없음
//  2) Create User > Insert DB / SendbirdAPI Create User
//  3) Access Token 반환
@Injectable()
export class SendbirdUserService {
    APP_ID: string;
    API_TOKEN: string;
    serverConfig: sendbird.ServerConfiguration<{ app_id: string }>;
    configuration: sendbird.Configuration;
    sendbirdAPI: sendbird.UserApi;

    constructor(
        private readonly configService: ConfigService,
        private readonly sendbirdUserRepo: SendbirdUserRepository,
    ) {
        this.APP_ID = this.configService.get('SENDBIRD_APP_ID');
        this.API_TOKEN = this.configService.get('SENDBIRD_API_TOKEN');
        this.serverConfig = new sendbird.ServerConfiguration(`https://api-${this.APP_ID}.sendbird.com`, { "app_id": this.APP_ID });
        this.configuration = sendbird.createConfiguration({ baseServer: this.serverConfig });
        this.sendbirdAPI = new sendbird.UserApi(this.configuration);
    }

    //1. 접속 시 유저 정보 조회
    // -> 있으면 토큰 반환, 없으면 생성 후 토큰반환
    async getConnectionByUserId(cu: CurrentUser) {
        const { web_id, with_id } = cu;
        const user = await this.sendbirdUserRepo.findByUserId(web_id);

        if (user) return user;

        if (!user) {
            //1. sendbird create user
            const createUser = await this.createUserFromSendbirdDashboard(web_id);

            //2. sendbird get user
            const getUser = await this.getUserFromSendbirdDashboard(createUser.userId);
            const { userId, nickname, accessToken, createdAt } = getUser;

            //3. repo insert user
            const userEntity = await this.sendbirdUserEntityBuild(with_id, userId, nickname, accessToken, createdAt);
            const savedUser = await this.sendbirdUserRepo.save(userEntity);

            return savedUser;
        }
    }

    /**
     * Get User From Sendbird DashBoard
     * @param userId 
     * @returns sendbird.SendBirdUser
     */
    async getUserFromSendbirdDashboard(userId: string) {
        try {
            const user = await this.sendbirdAPI.viewUserById(this.API_TOKEN, userId);
            console.log('getuserfromsb', user);
            return user;
        } catch (error) {
            const { message, code } = JSON.parse(error.body);
            throw new SendbirdBadRequestException(message, code);
        }
    }

    /**
     * Create User From Sendbird DashBoard
     * @param userId 
     * @param nickname 
     * @param profileUrl 
     * @returns sendbird.SendBirdUser;
     */
    async createUserFromSendbirdDashboard(userId: string) {
        const userData: sendbird.CreateUserData = {
            userId: userId,
            nickname: userId,
            profileUrl: null,
            issueAccessToken: true,
        }

        try {
            const user = await this.sendbirdAPI.createUser(this.API_TOKEN, userData);
            console.log('user', user);
            return user;
        } catch (error) {
            const { message, code } = JSON.parse(error.body);
            throw new SendbirdBadRequestException(message, code);
        }
    }

    /**
     * Update User From Sendbird Dashboard
     *  >> 실 사용 : Access Token 만료 시 재발급용
     * @param userId 
     * @returns 
     */
    async updateUser(userId: string) {
        const userData: sendbird.UpdateUserByIdData = {
            userId: userId,
            nickname: userId,
            profileUrl: null,
            issueAccessToken: true,
        }
        try {
            const updateUser = await this.sendbirdAPI.updateUserById(this.API_TOKEN, userId, userData);
            console.log('updatedUser', updateUser);
            return updateUser;
        } catch (error) {
            const { message, code } = JSON.parse(error.body);
            throw new SendbirdBadRequestException(message, code);
        }
    }


    // **************************************아래는 미사용하는 코드********************************************** 

    /**
     * 유저 리스트 조회
     * @returns sendbird.ListUsersResponse
     */
    async getUserList() {
        try {
            const users = await this.sendbirdAPI.listUsers(this.API_TOKEN, '', 10);
            console.log(users.users);
            return users.users;
        } catch (error) {
            const { message, code } = JSON.parse(error.body);
            throw new SendbirdBadRequestException(message, code);
        }
    }

    /**
     * 세션 토큰
     * @param userId 
     * @returns sendbird.CreateUserTokenResponse
     */
    async createUserToken(userId: string) {
        try {
            //13자리 unix timestamp 필요
            var currentDate = new Date();
            var futureDate = new Date(currentDate.getTime() + 300 * 1000);
            var unixTimestamp = Math.floor(futureDate.getTime());

            const token = await this.sendbirdAPI.createUserToken(this.API_TOKEN, userId, { expiresAt: unixTimestamp })
            console.log('token', token);
            return token
        } catch (error) {
            const { message, code } = JSON.parse(error.body);
            throw new SendbirdBadRequestException(message, code);
        }
    }

    async sendbirdUserEntityBuild(withId: string, userId: string, nickname: string, accessToken: string, createTime: number) {
        return new SendbirdUserEntityBuilder()
            .withWithId(withId)
            .withUserId(userId)
            .withNickname(nickname)
            .withAccessToken(accessToken)
            .withCreateTime(createTime)
            .build();
    }
}
