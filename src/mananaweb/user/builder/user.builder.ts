import { UserInvestmentDataEntity } from "../entity/user-investment.entity";
import { UserEntity } from "../entity/user.entity";

export class UserEntityBuilder {
  private no: number;
  private id: string;
  private pw: string;
  private refresh_token: string;
  private last_join_date: Date;
  private create_date: Date;
  private update_date: Date;
  private profits: UserInvestmentDataEntity[];

  withNo(no: number) {
    this.no = no;
    return this;
  }

  withId(id: string) {
    this.id = id;
    return this;
  }

  withPw(pw: string) {
    this.pw = pw;
    return this;
  }

  withRefreshToken(refresh_token: string) {
    this.refresh_token = refresh_token;
    return this;
  }

  withLastJoinDate(last_join_date: Date) {
    this.last_join_date = last_join_date;
    return this;
  }

  withCreateDate(create_date: Date) {
    this.create_date = create_date;
    return this;
  }

  withUpdateDate(update_date: Date) {
    this.update_date = update_date;
    return this;
  }

  withProfits(profits: UserInvestmentDataEntity[]) {
    this.profits = profits;
    return this;
  }

  build(): UserEntity {
    return Object.assign(new UserEntity(), this);
  }
}
