import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserProviderEnum } from '../../common/enums/user';

import { User } from '.';

@Entity('providers')
export class UserProvider {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'enum',
    enum: UserProviderEnum,
    default: UserProviderEnum.MICROSOFT,
  })
  type: UserProviderEnum;

  @Column({
    type: 'uuid',
  })
  oid: string;

  @ManyToOne(() => User, (user) => user.userProviders)
  user: User;

  constructor(data: Partial<UserProvider> = {}) {
    Object.assign(this, data);
  }
}
