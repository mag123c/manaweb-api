import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { CPResponse } from './response/cp.response';

@Injectable()
export class CalculatorService {

  async calculate(price: number, percent: number, time: number, type: string) {
    if (time <= 0 || price <= 0) return null;

    let priceArr = [price];
    let data = new Array<CPResponse>();
    let totalRevenue = 0;
    for (let i = 1; i <= time; i++) {
      const beforePrice = +priceArr[i - 1];
      const interest = beforePrice * (+percent / 100);
      const currentPrice = Math.round(beforePrice + interest);
      const revenue = currentPrice - beforePrice;
      const totalPercent = ((currentPrice - price) / (price / 100)).toFixed(2);
      totalRevenue += revenue;

      if (revenue === Infinity || !Number(revenue) || currentPrice === Infinity) {
        throw new BadRequestException();
      }

      priceArr.push(currentPrice);
      const cpResponse = new CPResponse(i + type, revenue, currentPrice, totalPercent + '%');
      data.push(cpResponse);
    }

    return { data, totalRevenue };
  }
}

