import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'sendbird_user_channel', database: 'sendbird'})
export class SendbirdUserChannelEntity {
    @ApiProperty({ description: 'no' })
    @PrimaryGeneratedColumn({ type: 'int' })
    no: number;

    @ApiProperty({ description: 'with_id' })
    @Column({ name: 'with_id' })
    with_id: string;

    @ApiProperty({ description: 'userId' })
    @Column({ name: 'userId' })
    userId: string;

    @ApiProperty({ description: 'channelUrl' })
    @Column({ name: 'channelUrl' })
    channelUrl: string;

    @ApiProperty({ description: 'lastMessage_message' })
    @Column({ name: 'lastMessage_message' })
    lastMessageMessage: string;

    @ApiProperty({ description: 'lastMessage_sender_userId' })
    @Column({ name: 'lastMessage_sender_userId' })
    lastMessageSenderUserId: string;

    @ApiProperty({ description: 'lastMessage_createdAt' })
    @Column({ name: 'lastMessage_createdAt' })
    lastMessageCreatedAt: number;

    @ApiProperty({ description: 'unreadMessageCount' })
    @Column({ name: 'unreadMessageCount' })
    unreadMessageCount: number;

    @ApiProperty({ description: 'createdAt' })
    @Column({ name: 'createdAt' })
    createdAt: number;    
}
