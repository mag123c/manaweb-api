import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { UserVisitEntity } from './entity/userVisit.entity';
import { UserClickEntity } from './entity/userClick.entity';

@Injectable()
export class LogService {
    constructor(
        @InjectRepository(UserVisitEntity)
        private userVisitRepository: Repository<UserVisitEntity>,
        @InjectRepository(UserClickEntity)
        private userClickRepository: Repository<UserClickEntity>
    ){}

    //Visit log
    async addVisitLog(req: any) {
        try {
            const userAgent: string = req.headers['user-agent'];
            const reqURL: string = req.url;
            const device = await this.checkDevice(userAgent);
            await this.userVisitRepository.save({ 'user_agent': userAgent, 'device': device, 'url': reqURL });
        } catch(error) {
            console.log(error);
        }
    }

    async checkDevice(userAgent: string) {
        if (userAgent.indexOf("iPhone") > -1) {
            return "iPhone";
        }
        else if (userAgent.indexOf("Android") > -1) {
            return "Android"
        }
        else return "PC"
    }
    //Visit log end

    //Calculate log
    async addCalculateLog(req: any) {  
        try {
            const reqURL: string = req.url.indexOf("?") > -1 ? req.url.split("?")[0] : req.url;
            const existLog = await this.findTodayCalculateLog(reqURL);
                    
            if(existLog) return await this.updateTodayCalculateLog(reqURL, existLog);
            else return await this. addTodayCalculateLog(reqURL)
        }catch(error) {
            console.log(error);
        }        
    }

    async findTodayCalculateLog(reqURL: string) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const startDate = today;
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        return await this.userClickRepository.findOne({
            where: {
                'create_date': Between(startDate, endDate),
                'url': reqURL
            }
        });
    }

    async addTodayCalculateLog(reqURL: string) {
        return await this.userClickRepository.save({ 'url': reqURL });
    }

    async updateTodayCalculateLog(reqURL: string, existLog: UserClickEntity) {
        existLog.clicks += 1;
        return await this.userClickRepository.save(existLog);
    }
    //Calculate log end
}

