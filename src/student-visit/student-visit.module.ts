import { forwardRef, Module } from '@nestjs/common';
import { StudentVisitsController } from './student-visit.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { StudentVisitsService } from './student-visit.service';
import { StudentVisit } from './student-visit.model';
import { Student } from '../students/student.model';
import { Schedule } from '../schedule/schedule.model';
import { Auditory } from '../auditory/auditory.model';
import { SchedulesModule } from 'src/schedule/schedules.module';
import { AuditoriesModule } from 'src/auditory/auditory.module';

@Module({
  controllers: [StudentVisitsController],
  providers: [StudentVisitsService],
  imports: [
    SequelizeModule.forFeature([StudentVisit, Schedule, Student, Auditory]),
    forwardRef(() => AuthModule),
    forwardRef(() => SchedulesModule),
    forwardRef(() => AuditoriesModule),
  ],
})
export class StudentVisitsModule {}
