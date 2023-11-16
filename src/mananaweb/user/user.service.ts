import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AuthService } from 'src/mananaweb/auth/auth.service';
import { Md5 } from 'md5-typescript';
import { UserInvestmentDataEntity } from './entity/user-investment.entity';
import UserInvestmentDataPutDto from './dto/user-investmentData.dto';
import { UserInvestmentDataEntityBuilder } from './builder/user-investment.builder';


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

    async getInvestmentDataByMonth(userNo: number, yyyymm: string): Promise<UserInvestmentDataEntity[]> {
        return await this.userInvestmentDataRepository.createQueryBuilder()
            .where('user_no = :userNo', { userNo })
            .andWhere('yyyymm = :yyyymm', { yyyymm })
            .orderBy('day', 'ASC')
            .getMany();
    }

    async putInvestmentDataByDay(entity: UserInvestmentDataEntity): Promise<UserInvestmentDataEntity> {
        return await this.userInvestmentDataRepository.save(entity);
    }

    async findInvestemtDataByUserNoAndDay(userNo: number, yyyymm: string, day: number) {
        return await this.userInvestmentDataRepository.findOneBy({ user_no: userNo, yyyymm: yyyymm, day: day });
    }

    async updateInvestmentDataByDay(entity: UserInvestmentDataEntity): Promise<UpdateResult> {
        return await this.userInvestmentDataRepository.update(entity.no, entity);
    }

    async deleteInvestmentDataByDay(no: number): Promise<DeleteResult> {
        return await this.userInvestmentDataRepository.delete(no);
    }
    //단순 DB로직 끝

    //JWT 관련 로직
    async refreshTokenMatches(refreshToken: string, no: number): Promise<UserEntity> {
        const user = await this.findByNo(no);

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

        const data = await this.getInvestmentDataByMonth(no, yyyymm);
        const totalProfit = this.calculateTotalProfit(data);

        return { data, totalProfit }
    }

    //2. 일일 투자 정보 입력
    async putInvestmentData(no: number, userInvDataPutDto: UserInvestmentDataPutDto) {
        const user = await this.findByNo(no);
        if (!user) throw new UnauthorizedException('로그인 후 이용해 주세요.')
        const { startPrice, endPrice, memo, yyyymm, day } = userInvDataPutDto;

        const profit = this.calculateProfit(+startPrice, +endPrice);
        const profitPercent = profit === 0 ? '0%' : this.calculateProfitPercent(+startPrice, profit);

        const existData = await this.findInvestemtDataByUserNoAndDay(no, yyyymm, +day);
        if (existData) {
            existData.start_price = +startPrice;
            existData.end_price = +endPrice;
            existData.profit = profit;
            existData.profit_percent = profitPercent;
            existData.memo = memo;
            existData.update_date = new Date();

            await this.updateInvestmentDataByDay(existData);
            return existData;
        }

        else {
            const entity = this.investmentDataEntityBuild(no, +startPrice, +endPrice, memo, yyyymm, +day, profit, profitPercent)

            return await this.putInvestmentDataByDay(entity);
        }
    }

    //3. 삭제
    async deleteInvestmentData(no: number, yyyymm: string, day: string) {
        const exists = await this.findInvestemtDataByUserNoAndDay(no, yyyymm, +day);
        return this.deleteInvestmentDataByDay(exists.no);
    }

    calculateProfit(startPrice: number, endPrice: number) {
        return endPrice - startPrice;
    }

    calculateProfitPercent(startPrice: number, profit: number) {
        return Math.round(((profit) / (startPrice / 100))) + '%';
    }
    
    calculateTotalProfit(data: UserInvestmentDataEntity[]) {
        return data.reduce((totalProfit, item) => totalProfit + item.profit, 0);
    }

    investmentDataEntityBuild(no: number, startPrice: number, endPrice: number, memo: string, yyyymm: string, day: number, profit: number, profitPercent: string) {
        return new UserInvestmentDataEntityBuilder()
            .withUserNo(no)
            .withYyyymm(yyyymm)
            .withDay(day)
            .withStartPrice(startPrice)
            .withEndPrice(endPrice)
            .withProfit(profit)
            .withProfitPercent(profitPercent)
            .withMemo(memo)
            .build();
    }

}