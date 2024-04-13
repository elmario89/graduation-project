import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Student } from '../students/student.model';

interface GroupCreationAttrs {
  name: string;
}

@Table({ tableName: 'groups' })
export class Group extends Model<Group, GroupCreationAttrs> {
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

  @ApiProperty({ example: '4262', description: 'Group name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @HasMany(() => Student)
  students: Student[];
}
