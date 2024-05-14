import { forwardRef, Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.model';
import { Discipline } from '../disciplines/discipline.model';
import { TeacherDisciplines } from './teacher-disciplines.model';
import { DisciplinesModule } from 'src/disciplines/disciplines.module';
import { SchedulesModule } from 'src/schedule/schedules.module';
import { Schedule } from 'src/schedule/schedule.model';
import { GroupsModule } from 'src/groups/groups.module';
import { Group } from 'src/groups/group.model';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService],
  imports: [
    SequelizeModule.forFeature([
      Teacher,
      Discipline,
      TeacherDisciplines,
      Schedule,
      Group,
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => DisciplinesModule),
    forwardRef(() => SchedulesModule),
    forwardRef(() => GroupsModule),
  ],
  exports: [TeacherService],
})
export class TeacherModule {}
