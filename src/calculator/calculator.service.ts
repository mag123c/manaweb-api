import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {

  async calculate(price: number, percent: number, time: number, type: string) {
    if(time <= 0 || price <= 0) return null;

    let priceArr = [price];
    let data = new Array();
    for(let i = 1; i < time; i ++) {
        const beforePrice = priceArr[i - 1];
        const currentPrice = Math.round(beforePrice + (beforePrice / 100 * percent));
        const priceThanBefore = currentPrice - beforePrice;
        const totalPercent = ((currentPrice - price) / (price / 100)).toFixed(2);

        priceArr.push(currentPrice);
        data.push({ 
            'tmp': i + type,
            'priceThanBefore': priceThanBefore,
            'currentPrice': currentPrice,
            'totalPercent': totalPercent + '%',
        });
    }
    
    return { priceArr, data };
  }
}
