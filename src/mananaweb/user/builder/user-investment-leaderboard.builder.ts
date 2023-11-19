import { UserInvestmentLeaderBoardEntity } from "../entity/user-investment-leaderboard.entity";

export class UserInvestmentLeaderboardEntityBuilder {
  private user_no: number;
  private start_price: number;
  private nickname: string;
  private total_profit: number;
  private total_profit_percent: string;  

  withUserNo(user_no: number) {
    this.user_no = user_no;
    return this;
  }

  withStartPrice(start_price: number) {
    this.start_price = start_price;
    return this;
  }


  withNickname(nickname: string) {
    this.nickname = nickname;
    return this;
  }

  withTotalProfit(total_profit: number) {
    this.total_profit = total_profit;
    return this;
  }

  withTotalProfitPercent(total_profit_percent: string) {
    this.total_profit_percent = total_profit_percent;
    return this;
  }


  build(): UserInvestmentLeaderBoardEntity {
    return Object.assign(new UserInvestmentLeaderBoardEntity(), this);
  }
}