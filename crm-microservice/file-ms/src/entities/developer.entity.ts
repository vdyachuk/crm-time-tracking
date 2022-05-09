import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Developer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    rate: number;

    @Column()
    salary: number;

    @Column()
    extraRate: number;

    @Column()
    bonus: number;

    @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at', nullable: true })
    public updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp without time zone', name: 'deleted_at', nullable: true })
    public deletedAt: Date;
}
