import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { DeveloperRoles } from '../roles/developer-roles.model';

interface DeveloperCreationAttrs {
    email: string;
    password: string;
}

@Table({ tableName: 'developers' })
export class Developer extends Model<Developer, DeveloperCreationAttrs> {
    static createDeveloper() {
        throw new Error('Method not implemented.');
    }
    @ApiProperty({ example: '1', description: 'Unique ID' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @ApiProperty({ example: 'developer@gmail.com', description: 'email' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;
    @ApiProperty({ example: '12345678', description: 'Password' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @BelongsToMany(() => Role, () => DeveloperRoles)
    roles: Role[];
}
