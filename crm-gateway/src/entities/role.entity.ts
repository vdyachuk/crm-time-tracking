import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Developer } from '../interface/developers.model';
import { Role } from '../interface/roles.model';

@Table({ tableName: 'developer_roles', createdAt: false, updatedAt: false })
export class DeveloperRoles extends Model<DeveloperRoles> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER })
    roleId: number;

    @ForeignKey(() => Developer)
    @Column({ type: DataType.INTEGER })
    developerId: number;
}
