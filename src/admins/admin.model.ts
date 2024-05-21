import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums/user-role.enum';

interface AdminCreationAttrs {
  login: string;
  password: string;
  role: UserRole;
  name: string;
  surname: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminCreationAttrs> {
  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Unique identificator',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
  })
  id: string;

  @ApiProperty({ example: 'mister', description: 'Admin name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'mister', description: 'Admin surname' })
  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;

  @ApiProperty({ example: 'mister', description: 'Admin login' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @ApiProperty({ example: 'mister', description: 'Admin password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: UserRole.Admin, description: 'Admin role' })
  @Column({
    type: DataType.ENUM(String(UserRole.Admin)),
    allowNull: false,
  })
  role: UserRole;
}
