import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PnlUserEntity } from './entity/pnl_user.entity';
import { PnlUserProfitEntity } from './entity/pnl_user_profit.entity';
import { DataSource, Repository } from 'typeorm';
import ProfitAndLossDto from './dto/pnlData.dto';

@Injectable()
export class PnlService {
    constructor(
        @InjectRepository(PnlUserEntity)
        private pnlUserRepository: Repository<PnlUserEntity>,
        @InjectRepository(PnlUserProfitEntity)
        private pnlUserProfitRepository: Repository<PnlUserProfitEntity>,
        private datasource: DataSource
    ) { }

    async saveUser(name: string) {        
        const existUser = await this.pnlUserRepository.findOneBy({ name });
        if(existUser) return existUser.name;
        else return (await this.pnlUserRepository.save({ name })).name;
    }

    async setData(profitLoss: ProfitAndLossDto) {
        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();  

        try {         
            const today = await this.calculateToday();
            const { name, start, end } = profitLoss;
            const user = await this.pnlUserRepository.findOneBy({ name });

            if (user) {
                const exist = await this.pnlUserProfitRepository.findOne({
                    where: { user: { no: user.no }, createDate: today}
                });

                if (exist) {
                    exist.start = start;
                    exist.end = end;
                    await this.pnlUserProfitRepository.save(exist);
                }
                else {
                    const newData = new PnlUserProfitEntity();
                    newData.userNo = user.no;
                    newData.start = start;
                    newData.end = end;
                    newData.createDate = today;
                    await this.pnlUserProfitRepository.save(newData);
                }
            }
            await queryRunner.commitTransaction();

        } catch (error) {
            await queryRunner.rollbackTransaction();

        } finally {
            await queryRunner.release();
        }

        
        //no가 user의 no와 같고 today가 같은 필드 조회
        
    }

    async calculateToday() {
        const enlistDayToDate = new Date();
        let year = enlistDayToDate.getFullYear();
        let month = enlistDayToDate.getMonth() + 1;
        let day = enlistDayToDate.getDate();

        const monthStr = month < 10 ? '0' + month : String(month);
        const dayStr = day < 10 ? '0' + day : String(day);
        
        return (year + "-" + monthStr + "-" + dayStr);
    }

    async getData(name: string) {
        const no = (await this.findOneByName(name)).no;
        return this.pnlUserProfitRepository.createQueryBuilder()
            .where('user_no = :no', {no})
            .orderBy('create_date', 'DESC')
            .getMany();
    }

    async findOneByName(name: string) {
        return await this.pnlUserRepository.findOneBy({ name });
    }

}
