import { forwardRef, Module } from '@nestjs/common';
import { AuditorysService } from './auditory.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { AuditorysController } from './auditory.controller';
import { Schedule } from '../schedule/schedule.model';
import { Auditory } from './auditory.model';
import { Building } from 'src/building/building.model';

@Module({
  providers: [AuditorysService],
  controllers: [AuditorysController],
  imports: [
    SequelizeModule.forFeature([Auditory, Schedule, Building]),
    forwardRef(() => AuthModule),
  ],
  exports: [AuditorysService],
})
export class AuditorysModule {}
