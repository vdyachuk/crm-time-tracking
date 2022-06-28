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

import { Department, Rate, LoggedDay, Project, Role, Profile, Notification, UserProvider } from './index';

import { UserStatusEnum } from '@enums/user';

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
    nullable: true,
  })
  salary: number;

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

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany(() => Rate, (rate) => rate.user)
  rates: Rate[];

  @OneToMany(() => LoggedDay, (loggedDay) => loggedDay.user)
  loggedDays: LoggedDay[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => UserProvider, (userProvider) => userProvider.user)
  userProviders: UserProvider[];

  @ManyToMany(() => Project)
  projects: Project[];

  constructor(data: Partial<User> = {}) {
    Object.assign(this, data);
  }
}
