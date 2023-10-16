import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'error_history' })
export class ErrorHistoryEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'no' })
  no: string;
  @Column()
  message: string;
  @Column()
  url: string;
  @Column("datetime", { name: "create_date", default: () => "CURRENT_TIMESTAMP"})
  create_date: Date;
}