import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'sendbird_user_message', database: 'sendbird'})
export class SendbirdUserMessageEntity {
    @ApiProperty({ description: 'no' })
    @PrimaryGeneratedColumn({ type: 'int' })
    no: number;

    @ApiProperty({ description: 'userId' })
    @Column({ name: 'userId' })
    userId: string;

    @ApiProperty({ description: 'channelUrl' })
    @Column({ name: 'channelUrl' })
    channelUrl: string;

    @ApiProperty({ description: 'messageId' })
    @Column({ name: 'messageId' })
    messageId: string;

    @ApiProperty({ description: 'message' })
    @Column({ name: 'message' })
    message: string;

    @ApiProperty({ description: 'sender_userId' })
    @Column({ name: 'sender_userId' })
    senderUserId: string;

    @ApiProperty({ description: 'createdAt' })
    @Column({ name: 'createdAt' })
    createdAt: number;

    @ApiProperty({ description: 'read' })
    @Column('boolean', { name: 'read' })
    read: boolean;    
}
