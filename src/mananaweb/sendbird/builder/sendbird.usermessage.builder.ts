import { SendbirdUserMessageEntity } from "../entity/sendbird.usermessage.entity";

export class SendbirdUserMessageEntityBuilder{
  private userId: string  
  private channelUrl: string;
  private messageId: number;  
  private message: string;
  private senderUserId: string;  
  private createdAt: number;
  private read: boolean;

  setUserId(userId: string) {
    this.userId = userId;
    return this;
  }

  setChannelUrl(channelUrl: string) {
    this.channelUrl = channelUrl;
    return this;
  }

  setMessageId(messageId: number) {
    this.messageId = messageId;
    return this;
  }

  setMessage(message: string) {
    this.message = message;
    return this;
  }

  setSenderUserId(senderUserId: string) {
    this.senderUserId = senderUserId;
    return this;
  }

  setCreatedAt(createdAt: number) {
    this.createdAt = createdAt;
    return this;
  }

  setRead(read: boolean) {
    this.read = read;
    return this;
  }


  build(): SendbirdUserMessageEntity {
    return Object.assign(new SendbirdUserMessageEntity(), this);
  }
}

export const SendbirdUserMessageEntityBuild = async (userId: string, channelUrl: string, messageId: number, message: string,
                                            senderUserId: string, createdAt: number, read: boolean) => {
  return new SendbirdUserMessageEntityBuilder()
      .setUserId(userId)
      .setChannelUrl(channelUrl)
      .setMessageId(messageId)
      .setMessage(message)
      .setSenderUserId(senderUserId)      
      .setCreatedAt(createdAt)      
      .setRead(read)
      .build();
}