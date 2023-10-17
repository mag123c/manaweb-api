import { Controller, Get } from "@nestjs/common";
import { ImitationService } from "./imitation.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ImitationResponse } from "./response/imitation.response";

@ApiTags('investment')
@Controller('/api/v1/investment/imiataion')
export class ImitationController {
  constructor(private imitationService: ImitationService) {}
  
  @Get('/test')
  @ApiResponse({ type: ImitationResponse })
  async test() {
    await this.imitationService.test();
  }
}