import { forwardRef, Module } from '@nestjs/common';
import { AuditoriesService } from './auditory.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { AuditoriesController } from './auditory.controller';
import { Schedule } from '../schedule/schedule.model';
import { Auditory } from './auditory.model';
import { Building } from 'src/building/building.model';

@Module({
  providers: [AuditoriesService],
  controllers: [AuditoriesController],
  imports: [
    SequelizeModule.forFeature([Auditory, Schedule, Building]),
    forwardRef(() => AuthModule),
  ],
  exports: [AuditoriesService],
})
export class AuditoriesModule {}
