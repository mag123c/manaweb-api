import { Body, Controller, Post, Put, Query, Get } from '@nestjs/common';
import { PnlService } from './pnl.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import ProfitAndLossDto from './dto/pnlData.dto';

@ApiTags('pnl 관리')
@Controller('/api/v1/investment/my')
export class PnlController {
    constructor(private pnlService: PnlService){}

    @Post('/user')
    @ApiOperation({ description: '회원 가입' })
    async saveUser(@Body() body: { name: string }) {
        const { name } = body;
        return await this.pnlService.saveUser(name);
    }

    @Put('/:user/saveData')
    @ApiOperation({ description: 'pnl 입력' })
    async setData(@Body() profitLoss: ProfitAndLossDto) {
        return await this.pnlService.setData(profitLoss);
    }

    @Get()
    @ApiOperation({ description: '데이터 가져오기' })
    async getData(@Query() name: string) {
        return await this.pnlService.getData(name);
    }
}
