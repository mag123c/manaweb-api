import { Injectable, Inject } from '@nestjs/common';
import * as sendbird from 'sendbird-platform-sdk-typescript';
import CurrentUser from 'src/mananaweb/auth/dto/currentUser.dto';
import { SendbirdUserRepository } from './sendbird.user.repository';
import { getUnixTimeAfetrDay } from 'src/common/util/DateUtil';
import { SEND_BIRD_PROVIDER } from '../../sendbird.provider';
import { SendbirdBadRequestException } from '../../util/customException';
import { SendbirdUserEntity } from '../../entity/sendbird.userinfo.entity';
import { SendbirdUserEntityBuilder } from '../../builder/sendbird.userinfo.builder';
import { InsertResult, UpdateResult } from 'typeorm';

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
    private readonly API_TOKEN: string;
    private readonly userAPI: sendbird.UserApi;

    constructor(
        private readonly sendbirdUserRepo: SendbirdUserRepository,
        @Inject(SEND_BIRD_PROVIDER)
        private sendbirdProvider: { sendbirdUserAPI: sendbird.UserApi, API_TOKEN: string },
    ) {
        this.API_TOKEN = sendbirdProvider.API_TOKEN;
        this.userAPI = sendbirdProvider.sendbirdUserAPI;
    }

    /** API part **/

    /**
     * 접속 시 유저 정보 조회
     * API endpoint - GET api/v1/sendbird/user
     * @param cu 
     * @returns SendbirdUserEntity
     */
    async getUserInfoAPI(cu: CurrentUser): Promise<SendbirdUserEntity> {
        const { web_id, with_id } = cu;

        try {
            // //토큰 만료 테스트중
            // const testuser = await this.getUserFromSendbirdDashboard(web_id);
            // return testuser;

            const user = await this.sendbirdUserRepo.findByUserId(web_id);

            //유저 있을 경우
            if (user) {
                // // -> token exp time 만료 시 토큰 재발급
                // // 토큰 만료시간이 없나..? 테스트 시작시간 : 231129 13:56
                // //getUnixTimeAfterDay() - 24시간 후의 unixtimestamp get
                // const compareUnixDate = getUnixTimeAfetrDay();
                // if (user.expirationTime < compareUnixDate) {
                //     const updatedUser = await this.updateSendbirdUserToTable(web_id, with_id);
                //     return updatedUser;
                // }

                return user;
            }
            
            //유저 없을 경우 생성 -> DB insert -> return SendbirdUserEntity
            else {
                const savedUser = await this.saveSendbirdUserToTable(web_id, with_id);
                return savedUser;
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    /**
     * Create User From Sendbird DashBoard
     * API endpoint - POST api/v1/sendbird/user
     * @param userId 
     * @returns sendbird.SendBirdUser;
     */
    async postUserCreateAPI(web_id: string, with_id: string): Promise<SendbirdUserEntity> {
        return await this.saveSendbirdUserToTable(web_id, with_id);
    }
    /** API part end **/



    /** Business Logic part **/

    /**
     * Get User From Sendbird DashBoard
     * @param userId 
     * @returns sendbird.SendBirdUser
     */
    async getUserFromSendbirdDashboard(userId: string): Promise<sendbird.SendBirdUser> {
        try {
            const user = await this.userAPI.viewUserById(this.API_TOKEN, userId);
            return user;
        } catch (error) {
            const { message, code } = JSON.parse(error.body);
            throw new SendbirdBadRequestException(message, code);
        }
    }

    /**
     * Create User From Sendbird DashBoard
     * @param userId 
     * @returns sendbird.SendBirdUser;
     */
    async createUserFromSendbirdDashboard(userId: string): Promise<sendbird.SendBirdUser> {
        const userData: sendbird.CreateUserData = {
            userId: userId,
            nickname: userId,
            profileUrl: null,
            issueAccessToken: true,
        }

        try {
            const user = await this.userAPI.createUser(this.API_TOKEN, userData);
            return user;
        } catch (error) {
            const { message, code } = JSON.parse(error.body);
            throw new SendbirdBadRequestException(message, code);
        }
    }

    /**
     * sendbird user create -> save to custom user db
     * @param web_id 
     * @param with_id 
     * @returns SendbirdUserEntity
     */
    async saveSendbirdUserToTable(web_id: string, with_id: string): Promise<SendbirdUserEntity> {
        try {
            //1. sendbird create user
            const createUser = await this.createUserFromSendbirdDashboard(web_id);

            //2. sendbird get user, create entity
            const userEntity = await this.getUserFromSendbirdAndCreateEntity(createUser.userId, with_id);

            //3. custom repo insert
            const savedUser = await this.sendbirdUserRepo.saveUser(userEntity);

            if (savedUser) return userEntity;
            return null;
        }
        catch (error) {

        }
    }

    /**
     * sendbird user update -> update to custom user db
     * @param web_id 
     * @param with_id 
     * @returns SendbirdUserEntity
     */
    async updateSendbirdUserToTable(web_id: string, with_id: string): Promise<SendbirdUserEntity> {
        try {
            //1. sendbird update user
            const updateUser = await this.updateUserFromSendbirdDashboard(web_id);

            //2. sendbird get user, create entity
            const userEntity = await this.getUserFromSendbirdAndCreateEntity(updateUser.userId, with_id);

            //3. custom repo update
            const updatedUser = await this.sendbirdUserRepo.updateUser(userEntity);

            if (updatedUser) return userEntity;
            return null;
        }
        catch (error) {
            console.error(error);
        }
    }
    /**
     * Update User From Sendbird Dashboard
     *  >> 실 사용 : Access Token 만료 시 재발급용
     * @param userId 
     * @returns 
     */
    async updateUserFromSendbirdDashboard(userId: string): Promise<sendbird.SendBirdUser> {
        const userData: sendbird.UpdateUserByIdData = {
            userId: userId,
            nickname: userId,
            profileUrl: null,
            issueAccessToken: true,
        }
        try {
            const updateUser = await this.userAPI.updateUserById(this.API_TOKEN, userId, userData);
            return updateUser;
        } catch (error) {
            const { message, code } = JSON.parse(error.body);
            throw new SendbirdBadRequestException(message, code);
        }
    }

    /**
     * Get User Data From SendbirdDashBoard -> create Entity for (save && update)
     * @param user_id 
     * @param with_id 
     * @returns 
     */
    async getUserFromSendbirdAndCreateEntity(user_id: string, with_id: string): Promise<SendbirdUserEntity> {
        const getUser = await this.getUserFromSendbirdDashboard(user_id);
        const { userId, nickname, accessToken, createdAt } = getUser;

        const userEntity = await this.sendbirdUserEntityBuild(with_id, userId, nickname, accessToken, createdAt);
        return userEntity;
    }

    /** Business Logic part end **/


    /** ETC **/

    /**
     * Entity Builder
     * @param withId 
     * @param userId 
     * @param nickname 
     * @param accessToken 
     * @param createTime 
     * @returns SendbirdUserEntity
     */
    async sendbirdUserEntityBuild(withId: string, userId: string, nickname: string, accessToken: string, createTime: number) {
        return new SendbirdUserEntityBuilder()
            .withWithId(withId)
            .withUserId(userId)
            .withNickname(nickname)
            .withAccessToken(accessToken)
            .withCreateTime(createTime)
            .withExpirationTime(getUnixTimeAfetrDay())
            .build();
    }

    /** ETC end**/



    // **************************************아래는 미사용하는 코드********************************************** 

    /**
     * 유저 리스트 조회
     * @returns sendbird.ListUsersResponse
     */
    async getUserList() {
        try {
            const users = await this.userAPI.listUsers(this.API_TOKEN, '', 10);
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

            const token = await this.userAPI.createUserToken(this.API_TOKEN, userId, { expiresAt: unixTimestamp })
            return token
        } catch (error) {
            const { message, code } = JSON.parse(error.body);
            throw new SendbirdBadRequestException(message, code);
        }
    }
}
