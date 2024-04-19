import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Student } from '../students/student.model';
import { Schedule } from '../schedule/schedule.model';
import { Faculty } from '../faculties/faculty.model';

interface GroupCreationAttrs {
  name: string;
}

export interface Test {
  name: string;
  time: Date;
  teacherId: string;
  disciplineId: string;
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
  id: string;

  @ApiProperty({ example: '4262', description: 'Group name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @HasMany(() => Student)
  students: Student[];

  @HasMany(() => Schedule)
  schedules: Schedule[];

  @ApiProperty({
    example: '2024-04-14 23:11:08.371+03',
    description: 'Education start date',
  })
  @Column({ type: DataType.DATE, allowNull: false })
  start: Date;

  @ApiProperty({
    example: '2024-04-14 23:11:08.371+03',
    description: 'Education finish date',
  })
  @Column({ type: DataType.DATE, allowNull: false })
  finish: Date;

  @BelongsTo(() => Faculty, {
    onUpdate: 'CONSTRAIN',
    hooks: true,
    onDelete: 'CONSTRAIN',
  })
  faculty: Faculty;

  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Faculty id',
  })
  @ForeignKey(() => Faculty)
  @Column({ type: DataType.UUID, allowNull: false })
  facultyId: string;
}
