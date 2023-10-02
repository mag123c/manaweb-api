import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user_visit_log', database: 'mananaweb'})
export class UserVisitEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    no: number;

    @Column({ name: 'user_agent', comment: 'req header의 user-agent' })
    user_agent: string;

    @Column({ name: 'device', comment: '접속 기기 타입'})
    device: string

    @Column({ name: 'url' })
    url: string

    @Column({ name: 'create_date', default: () => 'CURRENT_TIMESTAMP' })
    create_date: Date;
}