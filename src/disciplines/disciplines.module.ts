import { forwardRef, Module } from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Discipline } from './discipline.model';
import { DisciplinesController } from './disciplines.controller';
import { Teacher } from '../teachers/teacher.model';
import { TeacherDiscipline } from '../teachers/teacher-discipline.model';
import { Schedule } from '../schedule/schedule.model';
import { Faculty } from '../faculties/faculty.model';

@Module({
  providers: [DisciplinesService],
  controllers: [DisciplinesController],
  imports: [
    SequelizeModule.forFeature([
      Discipline,
      Teacher,
      TeacherDiscipline,
      Schedule,
      Faculty,
    ]),
    forwardRef(() => AuthModule),
  ],
  exports: [DisciplinesService],
})
export class DisciplinesModule {}
