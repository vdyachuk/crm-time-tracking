import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

import { User, Project, Client } from '.';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
  })
  name: string;

  @OneToOne(() => User)
  user: User;

  @OneToOne(() => Project)
  project: Project;

  @OneToOne(() => Client)
  client: Client;
}
