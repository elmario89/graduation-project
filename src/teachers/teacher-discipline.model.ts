import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Teacher } from './teacher.model';
import { Discipline } from '../disciplines/discipline.model';

@Table({ tableName: 'teacher_discipline', createdAt: false, updatedAt: false })
export class TeacherDiscipline extends Model<TeacherDiscipline> {
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

  @ForeignKey(() => Discipline)
  @Column({
    type: DataType.UUID,
  })
  disciplineId: string;
}
