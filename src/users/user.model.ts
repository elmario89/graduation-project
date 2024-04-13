import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums/user-role.enum';

interface UserCreationAttrs {
  login: string;
  password: string;
  role: UserRole;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
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
  id: number;

  @ApiProperty({ example: 'mister', description: 'User login' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @ApiProperty({ example: 'mister', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: UserRole.Admin, description: 'User role' })
  @Column({
    type: DataType.ENUM(
      String(UserRole.Student),
      String(UserRole.Teacher),
      String(UserRole.Admin),
    ),
    allowNull: false,
  })
  role: UserRole;
}
