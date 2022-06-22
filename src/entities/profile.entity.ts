import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

import { User } from '.';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    length: 255,
  })
  firstName: string;

  @Column({
    length: 255,
  })
  lastName: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  constructor(data: Partial<Profile> = {}) {
    Object.assign(this, data);
  }
}
