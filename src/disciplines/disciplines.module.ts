import { forwardRef, Module } from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Discipline } from './discipline.model';
import { DisciplinesController } from './disciplines.controller';
import { Teacher } from '../teachers/teacher.model';
import { TeacherDisciplines } from '../teachers/teacher-disciplines.model';

@Module({
  providers: [DisciplinesService],
  controllers: [DisciplinesController],
  imports: [
    SequelizeModule.forFeature([Discipline, Teacher, TeacherDisciplines]),
    forwardRef(() => AuthModule),
  ],
  exports: [DisciplinesService],
})
export class DisciplinesModule {}
