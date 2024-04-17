import { forwardRef, Module } from '@nestjs/common';
import { SchedulesController } from './schedules.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { SchedulesService } from './schedules.service';
import { Schedule } from './schedule.model';
import { Group } from '../groups/group.model';
import { GroupsModule } from '../groups/groups.module';
import { Discipline } from '../disciplines/discipline.model';
import { Teacher } from '../teachers/teacher.model';
import { Student } from '../students/student.model';

@Module({
  controllers: [SchedulesController],
  providers: [SchedulesService],
  imports: [
    SequelizeModule.forFeature([
      Schedule,
      Group,
      Discipline,
      Teacher,
      Student,
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => GroupsModule),
  ],
})
export class SchedulesModule {}
