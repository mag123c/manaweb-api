import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { SuggestionService } from './suggestion.service';

@Controller('/api/v1/suggestion')
export class SuggestionController {
  constructor(private suggestionService: SuggestionService) {}

  /**
   * 
   * @param suggestion
   * @returns insert suggestion boolean
   */
  @Post()
  async sendSuggestion(@Param() suggestion: string) {
    return this.suggestionService.sendSuggestion(suggestion);
  }

}
