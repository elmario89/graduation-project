import { forwardRef, Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.model';
import { Discipline } from '../disciplines/discipline.model';
import { TeacherDisciplines } from './teacher-disciplines.model';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService],
  imports: [
    SequelizeModule.forFeature([Teacher, Discipline, TeacherDisciplines]),
    forwardRef(() => AuthModule),
  ],
  exports: [TeacherService],
})
export class TeacherModule {}
