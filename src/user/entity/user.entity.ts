import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user', database: 'mananaweb'})
export class UserEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    no: number;

    @Column({ name: 'id', length: 20, unique: true })
    id: string;

    @Column({ name: 'pw', length: 20 })
    pw: string;

    @Column({ name: 'api_key', nullable: true})
    api_key: boolean;

    @Column({ name: 'create_date', default: () => 'CURRENT_TIMESTAMP' })
    create_date: Date;

    @Column({ name: 'update_date', default: () => 'CURRENT_TIMESTAMP' })
    update_date: Date;
}