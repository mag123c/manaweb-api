import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuggestionEntity } from 'src/suggestion/entity/suggestion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(SuggestionEntity)
        private suggestionRepo: Repository<SuggestionEntity>,
    ){}

    async signin(id: string, pw: string) {
        if(!this.validationID(id)) return;

        if(id === 'diehreo' && this.adminSignin(pw)) {
            return this.suggestionRepo.findBy({ read_tf: false })
        } 
        else return null;
    }

    validationID(id: string) {
        //특문, 공백 제한
        const regExp = /^[a-zA-Z0-9]+$/i;
        if(!regExp.test(id)) throw new BadRequestException('ID는 특수문자, 공백이 포함되면 안됩니다.');
        else return true;
    }

    adminSignin(pw: string) {
        const realPW = '!231231Aa';
        return pw === realPW ? true : false;
    }
}

