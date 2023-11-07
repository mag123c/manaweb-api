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
    user_no: number;

    @ManyToOne(() => UserEntity, { eager: true })
    @JoinColumn({ name: 'user_no', referencedColumnName: 'no' })
    user: UserEntity;

    @ApiProperty({ description: 'yyyymm' })
    @Column()
    yyyymm: string;

    @ApiProperty({ description: 'day' })
    @Column()
    day: number;

    @ApiProperty({ description: 'start_price' })
    @Column()
    start_price: number;

    @ApiProperty({ description: 'end_price' })
    @Column()
    end_price: number;

    @ApiProperty({ description: 'profit' })
    @Column()
    profit: number;

    @ApiProperty({ description: 'profit_percent' })
    @Column()
    profit_percent: number;

    @ApiProperty({ description: 'export' })
    @Column()
    withdrawl: number;

    @Column("datetime", { name: "create_date", default: () => "CURRENT_TIMESTAMP" })
    @Column()
    create_date: string;

    @Column("datetime", { name: "update_date", default: () => "CURRENT_TIMESTAMP" })
    @Column()
    update_date: string;
}
