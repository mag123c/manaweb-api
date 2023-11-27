import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PnlUserEntity } from './pnl_user.entity';

@Entity({ name: 'pnl_user_profit' })
export class PnlUserProfitEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  userNo: number;

  @ManyToOne(() => PnlUserEntity, { eager: true })
  @JoinColumn({ name: 'user_no', referencedColumnName: 'no' })
  user: PnlUserEntity;

  @Column()
  start: number;

  @Column()
  end: number;

  @Column()
  createDate: string;
}
