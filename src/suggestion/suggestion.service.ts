import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuggestionEntity } from './entity/suggestion.entity';

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
}

