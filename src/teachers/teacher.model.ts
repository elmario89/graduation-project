import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums/user-role.enum';
import { Discipline } from '../disciplines/discipline.model';
import { TeacherDiscipline } from './teacher-discipline.model';
import { Schedule } from '../schedule/schedule.model';
import { Faculty } from 'src/faculties/faculty.model';
import { TeacherFaculty } from './teacher-faculty.model';

interface TeacherCreationAttrs {
  login: string;
  password: string;
  name: string;
  surname: string;
  role: UserRole;
}

@Table({ tableName: 'teacher' })
export class Teacher extends Model<Teacher, TeacherCreationAttrs> {
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

  @ApiProperty({ example: 'mister', description: 'Teacher login' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @ApiProperty({ example: 'mister', description: 'Teacher password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'mister', description: 'Teacher name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'mister', description: 'Teacher surname' })
  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;

  @ApiProperty({ example: UserRole.Teacher, description: 'Teacher role' })
  @Column({
    type: DataType.ENUM(String(UserRole.Teacher)),
    defaultValue: UserRole.Teacher,
    allowNull: false,
  })
  role: UserRole;

  @BelongsToMany(() => Discipline, () => TeacherDiscipline)
  disciplines: Discipline[];

  @BelongsToMany(() => Faculty, () => TeacherFaculty)
  faculties: Faculty[];

  @HasMany(() => Schedule)
  schedules: Schedule[];
}
