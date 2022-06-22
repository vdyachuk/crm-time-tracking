import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { RoleNotificationType } from './index';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
  })
  name: string;

  @OneToMany(() => RoleNotificationType, (roleNotificationType) => roleNotificationType.role)
  roleNotificationTypes: RoleNotificationType[];
}
