import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user_investment_leaderboard' })
export class UserInvestmentLeaderBoardEntity {
    @ApiProperty({ description: 'no' })
    @PrimaryGeneratedColumn()
    no: number;

    @ApiProperty({ description: 'user_no' })
    @Column()
    user_no: number;

    @ApiProperty({ description: 'nickname' })
    @Column()
    nickname: string;

    @JoinColumn({ name: 'user_no', referencedColumnName: 'no' })
    user: UserEntity;

    @ApiProperty({ description: 'start_price' })
    @Column()
    start_price: string;

    @ApiProperty({ description: 'total_profit' })
    @Column()
    total_profit: number;

    @ApiProperty({ description: 'total_profit_percent' })
    @Column()
    total_profit_percent: string;

    @Column("datetime", { name: "update_date", default: () => "CURRENT_TIMESTAMP" })
    @Column()
    update_date: Date;
}
