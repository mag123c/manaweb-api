import { UserInvestmentLeaderBoardEntity } from "../entity/user-investment-leaderboard.entity";

export class UserInvestmentLeaderboardEntityBuilder {
  private userNo: number;
  private startPrice: number;
  private nickname: string;
  private totalProfit: number;
  private totalProfitPercent: string;  

  withUserNo(userNo: number) {
    this.userNo = userNo;
    return this;
  }

  withStartPrice(startPrice: number) {
    this.startPrice = startPrice;
    return this;
  }


  withNickname(nickname: string) {
    this.nickname = nickname;
    return this;
  }

  withTotalProfit(totalProfit: number) {
    this.totalProfit = totalProfit;
    return this;
  }

  withTotalProfitPercent(totalProfitPercent: string) {
    this.totalProfitPercent = totalProfitPercent;
    return this;
  }


  build(): UserInvestmentLeaderBoardEntity {
    return Object.assign(new UserInvestmentLeaderBoardEntity(), this);
  }
}