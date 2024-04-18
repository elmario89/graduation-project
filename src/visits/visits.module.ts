import { forwardRef, Module } from '@nestjs/common';
import { VisitsController } from './visits.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { VisitsService } from './visit.service';
import { Visit } from './visit.model';
import { Student } from '../students/student.model';
import { Schedule } from '../schedule/schedule.model';

@Module({
  controllers: [VisitsController],
  providers: [VisitsService],
  imports: [
    SequelizeModule.forFeature([Visit, Schedule, Student]),
    forwardRef(() => AuthModule),
  ],
})
export class VisitsModule {}