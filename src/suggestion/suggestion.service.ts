import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuggestionEntity } from './entity/suggestion.entity';
import { validationID } from 'src/util/vaildation';

@Injectable()
export class SuggestionService {
    constructor(
        @InjectRepository(SuggestionEntity)
        private suggestionRepository: Repository<SuggestionEntity>
    ){}

    async sendSuggestion(suggestion: string, email: string) {
        return this.suggestionRepository.save({ 'suggestion': suggestion, 'email': email });
    }

    async readCheckSuggestion(no: number) {
        console.log(no);
        return this.suggestionRepository.update({ no: no }, { read_tf: true })
    }

    async suggestionSignin(id: string, pw: string) {
        if(!validationID(id)) return;

        if(id === 'diehreo' && this.adminSignin(pw)) {
            return this.suggestionRepository.findBy({ read_tf: false })
        } 
        else return null;
    }

    adminSignin(pw: string) {
        const realPW = '!231231Aa';
        return pw === realPW ? true : false;
    }
}

