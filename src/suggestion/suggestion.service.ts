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

    async sendSuggestion(suggestion: string) {
        return this.suggestionRepository.save({ 'suggestion': suggestion });
    }
}

