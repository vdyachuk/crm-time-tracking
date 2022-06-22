import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { User } from './user.entity';
import { Project } from './project.entity';

@Entity('rates')
export class Rate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'double precision',
  })
  rate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.rates)
  user: User;

  @ManyToOne(() => Project, (project) => project.rates)
  project: Project;
}
