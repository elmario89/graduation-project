import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Teacher } from '../teachers/teacher.model';
import { TeacherDisciplines } from '../teachers/teacher-disciplines.model';
import { Schedule } from '../schedule/schedule.model';

interface DisciplineCreationAttrs {
  name: string;
}

@Table({ tableName: 'disciplines' })
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

  @BelongsToMany(() => Teacher, () => TeacherDisciplines)
  teachers: Teacher[];

  @HasMany(() => Schedule)
  schedules: Schedule[];
}
