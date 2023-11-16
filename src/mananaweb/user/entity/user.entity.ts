import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserInvestmentDataEntity } from "./user-investment.entity";

@Entity({ name: 'user', database: 'mananaweb'})
export class UserEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    no: number;

    @Column({ name: 'id', length: 20, unique: true })
    id: string;

    @Column({ name: 'pw'})
    pw: string;

    @Column({ name: 'refresh_token' })
    refresh_token: string;

    @Column({ name: 'last_join_date'})
    last_join_date: Date;

    @Column({ name: 'create_date', default: () => 'CURRENT_TIMESTAMP' })
    create_date: Date;

    @Column({ name: 'update_date', default: () => 'CURRENT_TIMESTAMP' })
    update_date: Date;

    @OneToMany(() => UserInvestmentDataEntity, (investment) => investment.user, { cascade: true })
    profits: UserInvestmentDataEntity[];
}