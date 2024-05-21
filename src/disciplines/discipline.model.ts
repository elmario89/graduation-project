import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Teacher } from '../teachers/teacher.model';
import { TeacherDiscipline } from '../teachers/teacher-discipline.model';
import { Schedule } from '../schedule/schedule.model';
import { Faculty } from 'src/faculties/faculty.model';

interface DisciplineCreationAttrs {
  name: string;
}

@Table({ tableName: 'discipline' })
export class Discipline extends Model<Discipline, DisciplineCreationAttrs> {
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
    example: 'Дискретная математика',
    description: 'Discipline name',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @BelongsToMany(() => Teacher, () => TeacherDiscipline)
  teachers: Teacher[];

  @HasMany(() => Schedule)
  schedules: Schedule[];

  @BelongsTo(() => Faculty)
  faculty: Faculty;

  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Faculty id',
  })
  @ForeignKey(() => Faculty)
  @Column({ type: DataType.UUID, allowNull: false })
  facultyId: string;
}
