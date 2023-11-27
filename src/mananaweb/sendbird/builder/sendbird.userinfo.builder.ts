import { SendbirdUserEntity } from "../entity/sendbird.userinfo.entity";

export class SendbirdUserEntityBuilder{
  private withId: string;
  private userId: string;
  private nickname: string;
  private accessToken: string;  
  private createTime: number;

  withWithId(withId: string) {
    this.withId = withId;
    return this;
  }


  withUserId(userId: string) {
    this.userId = userId;
    return this;
  }

  withNickname(nickname: string) {
    this.nickname = nickname;
    return this;
  }

  withAccessToken(accessToken: string) {
    this.accessToken = accessToken;
    return this;
  }

  withCreateTime(createTime: number) {
    this.createTime = createTime;
    return this;
  }


  build(): SendbirdUserEntity {
    return Object.assign(new SendbirdUserEntity(), this);
  }
}