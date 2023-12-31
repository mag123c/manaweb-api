import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user_click_log', database: 'mananaweb'})
export class UserClickEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    no: number;

    @Column({ name: 'url', comment: '클릭한 위치' })
    url: string;

    @Column({ name: 'clicks' })
    clicks: number;

    @Column({ name: 'create_date', default: () => 'CURRENT_TIMESTAMP' })
    create_date: Date;
}