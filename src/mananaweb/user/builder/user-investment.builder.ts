import { UserInvestmentDataEntity } from "../entity/user-investment.entity";

export class UserInvestmentDataEntityBuilder {
  private user_no: number;
  private yyyymm: string;
  private day: number;
  private start_price: number;
  private end_price: number;
  private profit: number;
  private profit_percent: string;
  private memo: string;

  withUserNo(user_no: number) {
    this.user_no = user_no;
    return this;
  }

  withYyyymm(yyyymm: string) {
    this.yyyymm = yyyymm;
    return this;
  }

  withDay(day: number) {
    this.day = day;
    return this;
  }

  withStartPrice(start_price: number) {
    this.start_price = start_price;
    return this;
  }

  withEndPrice(end_price: number) {
    this.end_price = end_price;
    return this;
  }

  withProfit(profit: number) {
    this.profit = profit;
    return this;
  }

  withProfitPercent(profit_percent: string) {
    this.profit_percent = profit_percent;
    return this;
  }

  withMemo(memo: string) {
    this.memo = memo;
    return this;
  }

  build(): UserInvestmentDataEntity {
    return Object.assign(new UserInvestmentDataEntity(), this);
  }
}
