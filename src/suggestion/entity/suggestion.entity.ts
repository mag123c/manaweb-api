import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'suggestion', database: 'mananaweb'})
export class SuggestionEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    no: number;

    @Column({ name: 'suggestion', length: 200 })
    suggestion: string;

    @Column({ name: 'create_date', default: () => 'CURRENT_TIMESTAMP' })
    create_date: Date;
}