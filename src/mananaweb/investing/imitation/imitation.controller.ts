import { Controller, Get, Param, Query } from "@nestjs/common";
import { ImitationService } from "./imitation.service";
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ImitationResponse } from "./response/imitation.response";

@ApiTags('investment')
@Controller('/investment/imitation')
export class ImitationController {
  constructor(private imitationService: ImitationService) {}
  
  @Get('/test')
  @ApiResponse({ type: ImitationResponse })
  async test(@Query('turn') turn: number) {
    return await this.imitationService.test(turn);
  }
}