import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Put } from '@nestjs/common';
import { SuggestionService } from './suggestion.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('suggestion')
@Controller('/suggestion')
export class SuggestionController {
  constructor(private suggestionService: SuggestionService) {}

  /**
   * 
   * @param suggestion
   * @returns insert suggestion boolean
   */
  @ApiOperation({ description: '의견 보내기' })
  @Post()
  async sendSuggestion(@Body() body: { suggestion: string; email: string }) {
    return this.suggestionService.sendSuggestion(body.suggestion, body.email);
  }

  @ApiOperation({ description: '읽은 의견 삭제 - admin' })
  @Put('read-true')
  async readCheckSuggestion(@Body('no') no: number) {
    console.log(no);
    return this.suggestionService.readCheckSuggestion(no);
  }

    /**
   * suggestion check (nav) :: not in DB
   * @param suggestion
   * @returns insert suggestion boolean
   */
    @ApiOperation({ description: 'signin' })
    @Post('signin')
    async suggestionSignin(@Body() body: { id: string; pw: string }) {
      return await this.suggestionService.suggestionSignin(body.id, body.pw);
    }

}
