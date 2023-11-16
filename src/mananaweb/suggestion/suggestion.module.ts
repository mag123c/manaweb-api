import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuggestionEntity } from './entity/suggestion.entity';
import { SuggestionController } from './suggestion.controller';
import { SuggestionService } from './suggestion.service';


@Module({
  controllers: [SuggestionController],
  exports: [SuggestionService],
  providers: [SuggestionService],
  imports: [TypeOrmModule.forFeature([
    SuggestionEntity
  ])]
})

export class SuggestionModule {}