import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {

  async calculate(price: number, percent: number, time: number, type: string) {
    if (time <= 0 || price <= 0) return null;

    let priceArr = [price];
    let data = new Array();
    let totalRevenue = 0;
    for (let i = 1; i <= time; i++) {
      const beforePrice = +priceArr[i - 1];
      const interest = beforePrice * (+percent / 100);
      const currentPrice = Math.round(beforePrice + interest);
      const revenue = currentPrice - beforePrice;
      const totalPercent = ((currentPrice - price) / (price / 100)).toFixed(2);
      totalRevenue += revenue;

      priceArr.push(currentPrice);
      data.push({
        'tmp': i + type,
        'revenue': revenue,
        'currentPrice': currentPrice,
        'totalPercent': totalPercent + '%',
      });
    }

    return { data, totalRevenue };
  }
}

