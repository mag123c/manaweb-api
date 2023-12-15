import { SendbirdUserChannelEntity } from "../entity/sendbird.userchannel.entity";

export class SendbirdUserChannelEntityBuilder{
  private withId: string;
  private userId: string;
  private channelUrl: string;
  private lastMessageMessage: string;  
  private lastMessageSenderUserId: string;
  private lastMessageCreatedAt: number;
  private unreadMessageCount: number;
  private createdAt: number;

  setWithId(withId: string) {
    this.withId = withId;
    return this;
  }

  setUserId(userId: string) {
    this.userId = userId;
    return this;
  }

  setChannelUrl(channelUrl: string) {
    this.channelUrl = channelUrl;
    return this;
  }

  setLastMessageMessage(lastMessageMessage: string) {
    this.lastMessageMessage = lastMessageMessage;
    return this;
  }

  setLastMessageCreatedAt(lastMessageCreatedAt: number) {
    this.lastMessageCreatedAt = lastMessageCreatedAt;
    return this;
  }

  setLastMessageSenderUserId(lastMessageSenderUserId: string) {
    this.lastMessageSenderUserId = lastMessageSenderUserId;
    return this;
  }

  setUnreadMessageCount(unreadMessageCount: number) {
    this.unreadMessageCount = unreadMessageCount;
    return this;
  }

  setCreatedAt(createdAt: number) {
    this.createdAt = createdAt;
    return this;
  }


  build(): SendbirdUserChannelEntity {
    return Object.assign(new SendbirdUserChannelEntity(), this);
  }
}

export const SendbirdUserChannelEntityBuild = async (withId: string, userId: string, channelUrl: string, lastMessageMessage: string, lastMessageSenderUserId: string, 
                                            lastMessageCreatedAt: number, unreadMessageCount: number, createdAt: number) => {
  return new SendbirdUserChannelEntityBuilder()
      .setWithId(withId)
      .setUserId(userId)
      .setChannelUrl(channelUrl)
      .setLastMessageMessage(lastMessageMessage)
      .setLastMessageSenderUserId(lastMessageSenderUserId)
      .setLastMessageCreatedAt(lastMessageCreatedAt)
      .setUnreadMessageCount(unreadMessageCount)
      .setCreatedAt(createdAt)      
      .build();
}