import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PnlUserProfitEntity } from './pnl_user_profit.entity';

@Entity({ name: 'pnl_user' })
export class PnlUserEntity {
  @PrimaryGeneratedColumn()
  no: number;

  @Column()
  name: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @OneToMany(() => PnlUserProfitEntity, (profit) => profit.user, { cascade: true })
  profits: PnlUserProfitEntity[];
}
