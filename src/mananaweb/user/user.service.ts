import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AuthService } from 'src/mananaweb/auth/auth.service';
import { Md5 } from 'md5-typescript';
import { UserInvestmentDataEntity } from './entity/user-investment.entity';
import UserInvestmentDataPutDto from './dto/user-investmentData.dto';
import { UserInvestmentDataEntityBuilder } from './builder/user-investment.builder';
import { UserLeaderBoardCreateDto } from './dto/user-leardboard.dto';
import { UserInvestmentLeaderBoardEntity } from './entity/user-investment-leaderboard.entity';
import { UserInvestmentLeaderboardEntityBuilder } from './builder/user-investment-leaderboard.builder';
import { HttpException } from 'sendbird-platform-sdk-typescript';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(UserInvestmentDataEntity)
        private userInvestmentDataRepository: Repository<UserInvestmentDataEntity>,
        @InjectRepository(UserInvestmentLeaderBoardEntity)
        private userInvestmentLeaderBoardRepository: Repository<UserInvestmentLeaderBoardEntity>,
        private readonly dataSource: DataSource,
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

    async findInvestemtDataByUserNoAndDay(userNo: number, yyyymm: string, day: number): Promise<UserInvestmentDataEntity> {
        return await this.userInvestmentDataRepository.findOneBy({ user_no: userNo, yyyymm: yyyymm, day: day });
    }

    async findInvestemtDataByUserNo(userNo: number): Promise<UserInvestmentDataEntity[]> {
        return await this.userInvestmentDataRepository.find({
            where: { user_no: userNo },
            order: {
                yyyymm: 'ASC',
                day: 'ASC',
            },
        });
    }

    async updateInvestmentDataByDay(entity: UserInvestmentDataEntity): Promise<UpdateResult> {
        return await this.userInvestmentDataRepository.update(entity.no, entity);
    }

    async deleteInvestmentDataByDay(no: number): Promise<DeleteResult> {
        return await this.userInvestmentDataRepository.delete(no);
    }

    async deleteInvDataByUserNo(userNo: number) {
        return await this.userInvestmentDataRepository.delete({ user_no: userNo });
    }

    async findAllLeaderBoard() {
        return await this.userInvestmentLeaderBoardRepository.find({select:
            { nickname: true, start_price: true, total_profit: true, total_profit_percent: true }
        });
    }

    async findLeaderBoardByUserNo(userNo: number): Promise<UserInvestmentLeaderBoardEntity> {
        return await this.userInvestmentLeaderBoardRepository.findOneBy({ user_no: userNo });
    }

    async saveLeaderBoard(entity: UserInvestmentLeaderBoardEntity) {
        return await this.userInvestmentLeaderBoardRepository.save(entity);
    }

    async deleteLeaderBoardByUserNo(userNo: number) {
        return await this.userInvestmentLeaderBoardRepository.delete({ user_no: userNo });
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
    //투자 정보관련
    // 1. 내 투자 정보 월별 조회
    async getInvestmentDataByYyyyMm(no: number, yyyymm: string) {
        if (!yyyymm) throw new BadRequestException('날짜 형식 에러');

        const data = await this.getInvestmentDataByMonth(no, yyyymm);
        const totalProfit = this.calculateTotalProfit(data);

        return { data, totalProfit }
    }

    // 2. 일일 투자 정보 입력
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

    // 3. 삭제
    async deleteInvestmentData(no: number, yyyymm: string, day: string) {
        const exists = await this.findInvestemtDataByUserNoAndDay(no, yyyymm, +day);
        return this.deleteInvestmentDataByDay(exists.no);
    }

    //리더보드 관련
    // 1. 리더보드 등록
    async createLeaderBoard(no: number, userLeaderBoardCreateDto: UserLeaderBoardCreateDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const user = await this.findByNo(no);
            const exist = await this.findLeaderBoardByUserNo(no);
            if (exist) {
                throw new BadRequestException('exists');
            }

            //기 투자 데이터
            const userInvData = await this.findInvestemtDataByUserNo(no);
            if (userInvData.length === 0) {
                throw new BadRequestException('no data');
            }

            //나머지 정보 세팅
            const { startPrice, nickname } = userLeaderBoardCreateDto;

            const start_price: number = (startPrice) ? +startPrice : userInvData[0].start_price;
            const nick_name: string = (nickname) ? nickname : user.id;
            // const total_profit = await this.getTotalProfitFromInvData(userInvData);
            const total_profit: number = this.calculateProfit(start_price, userInvData[userInvData.length - 1].end_price);
            const total_profit_percent = this.calculateProfitPercent(start_price, total_profit);

            const entity = this.leaderBoardEntityBuild(no, start_price, nick_name, total_profit, total_profit_percent);
            const result = await this.saveLeaderBoard(entity);

            await queryRunner.commitTransaction();

            return result;
        }

        catch (error) {
            await queryRunner.rollbackTransaction();
            if (error.response.statusCode === 400) {
                throw new BadRequestException(`${error.response.message}`);
            }
        }

        finally {
            await queryRunner.release();
        }
        //이미 등록되어있을 때
    }
    // 2. 전체 리더보드 조회(입장 시)
    async getLeaderBoard() {
        return await this.findAllLeaderBoard();
        // const entity = await this.findAllLeaderBoard();
        // const profit_first = entity.sort((a, b) => b.total_profit - a.total_profit)[0];
        // const profitPercent_first = entity.sort((a, b) => b.total_profit_percent.localeCompare(a.total_profit_percent))[0];
        // console.log(entity, profitPercent_first, profit_first);
        // return { entity, profit_first, profitPercent_first }
    }

    //데이터 전체 초기화
    async initData(no: number) {
        return await (this.deleteInvDataByUserNo(no), this.deleteLeaderBoardByUserNo(no));
    }

    // async getTotalProfitFromInvData(data: UserInvestmentDataEntity[]): Promise<number> {
    //     return data.reduce((acc, item) => {
    //         return acc + item.profit;
    //     }, 0)
    // }

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

    leaderBoardEntityBuild(userNo: number, startPrice: number, nickname: string, totalProfit: number, totalProfitPercent: string) {
        return new UserInvestmentLeaderboardEntityBuilder()
            .withUserNo(userNo)
            .withStartPrice(startPrice)
            .withNickname(nickname)
            .withTotalProfit(totalProfit)
            .withTotalProfitPercent(totalProfitPercent)
            .build();
    }

}