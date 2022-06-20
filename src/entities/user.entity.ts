import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

import { Department, Rate, LoggedDay, Project, Role, Profile, Notification } from '.';

import { UserStatusEnum, UserProviderEnum } from '../common/enums/user';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    length: 255,
    unique: true,
  })
  email: string;

  @Exclude()
  @Column({
    length: 255,
    nullable: true,
  })
  password: string;

  @Column({ nullable: true, name: 'refreshToken' })
  refreshToken: string;

  @Column({
    type: 'decimal',
  })
  salary: number;

  @Column({
    type: 'enum',
    enum: UserProviderEnum,
    default: UserProviderEnum.NATIVE,
  })
  provider: UserProviderEnum;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.IDLE,
  })
  status: UserStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;

  @OneToOne(() => Department)
  @JoinColumn()
  department: Department;

  @OneToOne(() => Profile)
  profile: Profile;

  @OneToMany(() => Rate, (rate) => rate.user)
  rates: Rate[];

  @OneToMany(() => LoggedDay, (loggedDay) => loggedDay.user)
  loggedDays: LoggedDay[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @ManyToMany(() => Project)
  projects: Project[];

  constructor(data: Partial<User> = {}) {
    Object.assign(this, data);
  }
}
