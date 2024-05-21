import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Teacher } from './teacher.model';
import { Faculty } from 'src/faculties/faculty.model';

@Table({ tableName: 'teacher_faculty', createdAt: false, updatedAt: false })
export class TeacherFaculty extends Model<TeacherFaculty> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
  })
  id: string;

  @ForeignKey(() => Teacher)
  @Column({
    type: DataType.UUID,
  })
  teacherId: string;

  @ForeignKey(() => Faculty)
  @Column({
    type: DataType.UUID,
  })
  facultyId: string;
}
