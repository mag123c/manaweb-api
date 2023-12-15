import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'sendbird_user_channel', database: 'sendbird'})
export class SendbirdUserChannelEntity {
    @ApiProperty({ description: 'no' })
    @PrimaryGeneratedColumn({ type: 'int' })
    no: number;

    @ApiProperty({ description: 'with_id', nullable: false })
    @Column('varchar', { name: 'with_id' })
    withId: string;

    @ApiProperty({ description: 'channel_create_id', nullable: false })
    @Column('varchar', { name: 'channel_create_id' })
    channelCreateId: string;

    @ApiProperty({ description: 'channelUrl', nullable: false })
    @Column('varchar', { name: 'channelUrl' })
    channelUrl: string;

    @ApiProperty({ description: 'lastMessage_message', nullable: true, required: false })
    @Column('varchar', { name: 'lastMessage_message' })
    lastMessageMessage: string;

    @ApiProperty({ description: 'lastMessage_sender_userId', nullable: true, required: false })
    @Column('varchar', { name: 'lastMessage_sender_userId' })
    lastMessageSenderUserId: string;

    @ApiProperty({ description: 'lastMessage_createdAt', nullable: true, required: false })
    @Column('int', { name: 'lastMessage_createdAt' })
    lastMessageCreatedAt: number;

    @ApiProperty({ description: 'unreadMessageCount', nullable: true, required: false })
    @Column('int', { name: 'unreadMessageCount' })
    unreadMessageCount: number;

    @ApiProperty({ description: 'createdAt', nullable: true, required: false })
    @Column('int', { name: 'createdAt' })
    createdAt: number;    
}
