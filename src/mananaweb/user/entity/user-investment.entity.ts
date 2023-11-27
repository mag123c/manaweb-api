import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user_investment_data' })
export class UserInvestmentDataEntity {
    @ApiProperty({ description: 'no' })
    @PrimaryGeneratedColumn()
    no: number;

    @ApiProperty({ description: 'user_no' })
    @Column()
    userNo: number;

    @ManyToOne(() => UserEntity, { eager: true })
    @JoinColumn({ name: 'user_no', referencedColumnName: 'no' })
    user: UserEntity;

    @ApiProperty({ description: 'yyyymm' })
    @Column()
    yyyymm: string;

    @ApiProperty({ description: 'day' })
    @Column()
    day: number;

    @ApiProperty({ description: 'startPrice' })
    @Column()
    startPrice: number;

    @ApiProperty({ description: 'endPrice' })
    @Column()
    endPrice: number;

    @ApiProperty({ description: 'profit' })
    @Column()
    profit: number;

    @ApiProperty({ description: 'profitPercent' })
    @Column()
    profitPercent: string;

    @ApiProperty({ description: 'memo' })
    @Column()
    memo: string;

    @ApiProperty({ description: 'createDate' })
    @Column("datetime", { name: "create_date", default: () => "CURRENT_TIMESTAMP" })    
    createDate: Date;

    @ApiProperty({ description: 'updateDdate' })
    @Column("datetime", { name: "update_date", default: () => "CURRENT_TIMESTAMP" })
    updateDate: Date;

}
