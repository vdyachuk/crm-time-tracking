import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { User } from './index';
import { Project } from './project.entity';

@Entity('loggedDays')
export class LoggedDay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column({
    type: 'decimal',
  })
  hours: number;

  @Column({
    type: 'decimal',
  })
  minutes: number;

  @Column({
    type: 'text',
  })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.loggedDays)
  user: User;

  @ManyToOne(() => Project, (project) => project.loggedDays)
  project: Project;
}