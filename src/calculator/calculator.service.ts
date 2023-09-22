import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {

  async calculate(price: number, percent: number, time: string) {
    const timeSplit = time.split(":");
    const realTime = +timeSplit[0].trim();
    const timeUnit = timeSplit[1].trim();

    if(realTime === 0) return null;

    let priceArr = [price];
    let data = new Array();
    for(let i = 1; i <= realTime; i ++) {
        const beforePrice = priceArr[i - 1];
        const currentPrice = Math.round(beforePrice + (beforePrice / 100 * percent));
        const priceThanBefore = currentPrice - beforePrice;
        const totalPercent = ((currentPrice - price) / (price / 100)).toFixed(2);

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
