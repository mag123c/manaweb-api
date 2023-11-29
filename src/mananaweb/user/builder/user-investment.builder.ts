import { UserInvestmentDataEntity } from "../entity/user-investment.entity";

export class UserInvestmentDataEntityBuilder {
  private userNo: number;
  private yyyymm: string;
  private day: number;
  private startPrice: number;
  private endPrice: number;
  private profit: number;
  private profitPercent: string;
  private memo: string;

  withUserNo(userNo: number) {
    this.userNo = userNo;
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

  withStartPrice(startPrice: number) {
    this.startPrice = startPrice;
    return this;
  }

  withEndPrice(endPrice: number) {
    this.endPrice = endPrice;
    return this;
  }

  withProfit(profit: number) {
    this.profit = profit;
    return this;
  }

  withProfitPercent(profitPercent: string) {
    this.profitPercent = profitPercent;
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
