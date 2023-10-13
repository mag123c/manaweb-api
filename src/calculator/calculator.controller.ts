import { Controller, Get,Query } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { ApiResponse } from '@nestjs/swagger';
import { CPResponse } from './response/cp.response';

@Controller('/api/v1/calculator')
export class CalculatorController {
  constructor(
    private readonly calculatorService: CalculatorService,
    ) {}

  @ApiResponse({ type: CPResponse })
  @Get('/cp')
  async calculateCp(@Query('price') price: number, @Query('percent') percent: number, @Query('time') time: number, @Query('type') type: string) {
    return await this.calculatorService.calculateCp(price, percent, time, type);
  }

  @ApiResponse({ type: CPResponse })
  @Get('/military')
  async calculateMilitary(@Query('price') price: number, @Query('percent') percent: number, @Query('time') time: number, @Query('type') type: string) {
    return await this.calculatorService.calculateMilitary(price, percent, time, type);
  }

  @Get('/test')
  async test() {
    const paramPrice = 1000000;
    const paramTime = "20 일";
    const paramPercent = 10;

    const timeSplit = paramTime.split(' ');
    const time = +timeSplit[0];
    const unit = timeSplit[1];

    if(time === 0) return null;

    let priceArr = [paramPrice];
    let data = new Array();
    for(let i = 1; i <= time; i ++) {
        const beforePrice = priceArr[i - 1];
        const currentPrice = Math.round(beforePrice + (beforePrice / 100 * paramPercent));
        const priceThanBefore = currentPrice - beforePrice;
        const totalPercent = ((currentPrice - paramPrice) / (paramPrice / 100)).toFixed(2);

        priceArr.push(currentPrice);
        data.push({ 
            'tmp': i,
            'priceThanBefore': priceThanBefore,
            'currentPrice': currentPrice,
            'totalPercent': totalPercent,
        });
      }
    
    return { priceArr, data };
  }
}
