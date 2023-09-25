import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user_visit_log', database: 'mananaweb'})
export class UserVisitEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    no: number;

    @Column({ name: 'user_agent', comment: 'req header의 user-agent' })
    user_agent: string;

    @Column({ name: 'platform_type', comment: '접속 기기 타입'})
    platform_type: string

    @Column({ name: 'create_date'})
    create_date: Date;
}