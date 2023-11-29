import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'sendbird_userinfo', database: 'sendbird'})
export class SendbirdUserEntity {
    @ApiProperty({ description: 'no' })
    @PrimaryGeneratedColumn({ type: 'int' })
    no: number;

    @ApiProperty({ description: 'withId' })
    @Column({ name: 'with_id' })
    withId: string;

    @ApiProperty({ description: 'userId' })
    @Column({ name: 'userId' })
    userId: string;

    @ApiProperty({ description: 'nickname' })
    @Column({ name: 'nickname' })
    nickname: string;

    @ApiProperty({ description: 'access_token' })
    @Column({ name: 'access_token' })
    accessToken: number;

    @ApiProperty({ description: '토큰만료시간' })
    @Column({ type: 'bigint', name: 'expiration_time' })
    expirationTime: number;    

    @ApiProperty({ description: 'create_time' })
    @Column({ name: 'create_time' })
    createTime: number;    
}
