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

  async military(enlistDay: string, months: number) {
    if (!enlistDay || !months) throw new BadRequestException('BadrequestException:: NPE');

    const calDischargeDate = await this.calculateDischargeDate(enlistDay, months);
    const calRemainDay = await this.calculateRemainDay(calDischargeDate);

    return { calDischargeDate, calRemainDay }
  }

  async calculateDischargeDate(enlistDay: string, months: number) {
    const enlistDayToDate = new Date(enlistDay);
    enlistDayToDate.setMonth(enlistDayToDate.getMonth() + months);
    enlistDayToDate.setDate(enlistDayToDate.getDate() - 1);
    
    let year = enlistDayToDate.getFullYear();
    let month = enlistDayToDate.getMonth() + 1; // 월은 0부터 시작하므로 +1을 해줍니다.
    let day = enlistDayToDate.getDate();
    
    // month와 day가 한 자릿수인 경우, 앞에 0을 추가합니다.
    const monthStr = month < 10 ? '0' + month : String(month);
    const dayStr = day < 10 ? '0' + day : String(day);
    
    return year + "-" + monthStr + "-" + dayStr;    
  }

  async calculateRemainDay(dischargeDate: string) {
    const enlistDate = new Date();
    const remainDate = new Date(dischargeDate);
    const diff = Math.abs(remainDate.getTime() - enlistDate.getTime());
    return Math.ceil(diff / (1000 * 60 * 60 * 24));     
  }
}

