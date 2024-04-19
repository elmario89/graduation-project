import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Group } from '../groups/group.model';

interface FacultyCreationAttrs {
  name: string;
}

@Table({ tableName: 'faculties' })
export class Faculty extends Model<Faculty, FacultyCreationAttrs> {
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

  @ApiProperty({
    example: 'Кафедра конструкции и проектирования летательных аппаратов',
    description: 'Faculty name',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @HasMany(() => Group)
  groups: Group[];
}
