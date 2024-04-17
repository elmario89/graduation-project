import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums/user-role.enum';
import { Group } from '../groups/group.model';

interface StudentCreationAttrs {
  login: string;
  password: string;
  name: string;
  surname: string;
  role: UserRole;
}

@Table({ tableName: 'students' })
export class Student extends Model<Student, StudentCreationAttrs> {
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

  @ApiProperty({ example: 'mister', description: 'Student login' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @ApiProperty({ example: 'mister', description: 'Student password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'mister', description: 'Student name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'mister', description: 'Student surname' })
  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;

  @ApiProperty({ example: UserRole.Student, description: 'Student role' })
  @Column({
    type: DataType.ENUM(...Object.values(UserRole.Student)),
    defaultValue: UserRole.Student,
  })
  role: UserRole;

  @BelongsTo(() => Group)
  group: Group;

  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Student group id',
  })
  @ForeignKey(() => Group)
  @Column({ type: DataType.UUID, allowNull: false })
  groupId: string;
}
