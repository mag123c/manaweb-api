import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ErrorHistoryEntity } from "./entity/errorhistory.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ErrorHistoryService {
    constructor(
        @InjectRepository(ErrorHistoryEntity)
        private errorRepository: Repository<ErrorHistoryEntity>,
    ){}
    //전역 필터에서 바로 넘어옴
    async saveHistory(message: string, url: string) {
        await this.errorRepository.save({ message, url })
    }
}