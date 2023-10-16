import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { CPResponse } from './response/cp.response';

@Injectable()
export class CalculatorService {

  async calculateCp(price: number, percent: number, time: number, type: string) {
    if (Number(price) <= 0 || Number(percent) <= 0 || Number(time) <= 0) {
      throw new BadRequestException('BadrequestException:: NPE');
    }

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

      if (revenue === Infinity || currentPrice === Infinity) {
        throw new BadRequestException('BadRequestException:: Number cannot Infinity');
      }

      priceArr.push(currentPrice);
      const cpResponse = new CPResponse(i + type, revenue, currentPrice, totalPercent + '%');
      data.push(cpResponse);
    }

    return { data, totalRevenue };
  }

  async calculateMilitary(enlistDay: string, months: number) {
    if (!enlistDay || !months) return null;

    const enlistDayToDate = new Date(enlistDay);
    enlistDayToDate.setMonth(enlistDayToDate.getMonth() + months);
    const remainDayData = enlistDayToDate.toISOString().slice(0, 10);
    console.log(remainDayData);
    return { remainDayData };
  }
}

