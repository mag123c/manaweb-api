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
  async sendSuggestion(@Body() body: { suggestion: string; email: string }) {
    return this.suggestionService.sendSuggestion(body.suggestion, body.email);
  }

}
