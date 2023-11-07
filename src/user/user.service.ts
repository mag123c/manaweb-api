import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Md5 } from 'md5-typescript';
import { UserInvestmentDataEntity } from './entity/user-investment.entity';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(UserInvestmentDataEntity)
        private userInvestmentDataRepository: Repository<UserInvestmentDataEntity>,
    ) { }
    //단순 DB로직
    async findByNo(no: number): Promise<UserEntity> {
        return await this.userRepository.findOneBy({ no: no });
    }

    async findById(id: string): Promise<UserEntity> {
        return await this.userRepository.findOneBy({ id: id })
    }

    async saveUser(savedUser: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(savedUser);
    }

    async updateSignin(user: UserEntity): Promise<UpdateResult> {
        return await this.userRepository.update(user.no, { last_join_date: user.last_join_date })
    }

    async updateRefreshToken(no: number, currentHashedRefreshToken: string): Promise<UpdateResult> {
        return await this.userRepository.update(no, { refresh_token: currentHashedRefreshToken })
    }
    //단순 DB로직

    //JWT 관련 로직
    async refreshTokenMatches(refreshToken: string, id: string): Promise<UserEntity> {
        const user = await this.findById(id);

        const isMatches = this.isMatch(refreshToken, user.refresh_token);
        if (isMatches) return user;
    }

    async removeRefreshToken(no: number): Promise<UpdateResult> {
        return this.userRepository.update(no, { refresh_token: null });
    }

    isMatch(userInput: string, hashed: string): boolean {
        return Md5.init(userInput) == hashed;
    }
    //JWT 관련 로직 끝
    

    //비즈니스 로직
    //1. 내 투자 정보 월별 조회
    async getInvestmentDataByYyyyMm(no: number, yyyymm: string) {
        if (!yyyymm) throw new BadRequestException('날짜 형식 에러');

        return await this.userInvestmentDataRepository.createQueryBuilder()
            .where('user_no = :no', {no})
            .andWhere('yyyymm = :yyyymm', {yyyymm})
            .orderBy('day', 'ASC')
            .getMany();
    }
}