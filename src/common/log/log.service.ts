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
    async addVisitLog(req:any, url: string) {
        try {
            const userAgent: string = req.headers['user-agent'];
            const device = await this.checkDevice(userAgent);
            await this.userVisitRepository.save({ 'user_agent': userAgent, 'device': device, 'url': url });
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
    async addCalculateLog(url: any) {  
        try {
            const reqURL: string = url.indexOf("?") > -1 ? url.split("?")[0] : url;
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
        return await this.userClickRepository.save({ 'url': reqURL, 'clicks': 1 });
    }

    async updateTodayCalculateLog(reqURL: string, existLog: UserClickEntity) {
        existLog.clicks += 1;
        return await this.userClickRepository.save(existLog);
    }
    //Calculate log end
}

