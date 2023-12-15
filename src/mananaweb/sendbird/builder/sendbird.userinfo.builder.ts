import { getUnixTimeAfetrDay } from "src/common/util/DateUtil";
import { SendbirdUserEntity } from "../entity/sendbird.userinfo.entity";

export class SendbirdUserEntityBuilder{
  private withId: string;
  private userId: string;
  private nickname: string;
  private accessToken: string;  
  private expirationTime: number;
  private createTime: number;

  setWithId(withId: string) {
    this.withId = withId;
    return this;
  }


  setUserId(userId: string) {
    this.userId = userId;
    return this;
  }

  setNickname(nickname: string) {
    this.nickname = nickname;
    return this;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
    return this;
  }

  setExpirationTime(expirationTime: number) {
    this.expirationTime = expirationTime;
    return this;
  }

  setCreateTime(createTime: number) {
    this.createTime = createTime;
    return this;
  }


  build(): SendbirdUserEntity {
    return Object.assign(new SendbirdUserEntity(), this);
  }
}

export const SendbirdUserEntityBuild = async (withId: string, userId: string, nickname: string, accessToken: string, createTime: number) => {
  return new SendbirdUserEntityBuilder()
      .setWithId(withId)
      .setUserId(userId)
      .setNickname(nickname)
      .setAccessToken(accessToken)
      .setCreateTime(createTime)
      //만료기간 확인하면 변경하기.
      .setExpirationTime(getUnixTimeAfetrDay())
      .build();
}