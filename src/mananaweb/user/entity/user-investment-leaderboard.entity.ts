import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user_investment_leaderboard' })
export class UserInvestmentLeaderBoardEntity {
    @ApiProperty({ description: 'no' })
    @PrimaryGeneratedColumn()
    no: number;

    @ApiProperty({ description: 'userNo' })
    @Column()
    userNo: number;

    @ApiProperty({ description: 'nickname' })
    @Column()
    nickname: string;

    @JoinColumn({ name: 'user_no', referencedColumnName: 'no' })
    user: UserEntity;

    @ApiProperty({ description: 'startPrice' })
    @Column()
    startPrice: string;

    @ApiProperty({ description: 'totalProfit' })
    @Column()
    totalProfit: number;

    @ApiProperty({ description: 'totalProfitPercent' })
    @Column()
    totalProfitPercent: string;

    @Column("datetime", { name: "update_date", default: () => "CURRENT_TIMESTAMP" })
    @Column()
    updateDate: Date;
}
