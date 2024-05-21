import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Student } from '../students/student.model';
import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from '../schedule/schedule.model';

@Table({ tableName: 'student_visit', createdAt: false, updatedAt: false })
export class StudentVisit extends Model<StudentVisit> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
  })
  id: string;

  @ForeignKey(() => Schedule)
  @Column({
    type: DataType.UUID,
  })
  scheduleId: string;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.UUID,
  })
  studentId: string;

  @ApiProperty({
    example: '2024-04-14 23:11:08.371+03',
    description: 'StudentVisit date',
  })
  @Column({ type: DataType.DATE, allowNull: false })
  date: Date;
}
