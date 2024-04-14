import { forwardRef, Module } from '@nestjs/common';
import { SchedulesController } from './schedules.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { SchedulesService } from './schedules.service';
import { Schedule } from './schedule.model';
import { Group } from '../groups/group.model';
import { GroupsModule } from '../groups/groups.module';

@Module({
  controllers: [SchedulesController],
  providers: [SchedulesService],
  imports: [
    SequelizeModule.forFeature([Schedule, Group]),
    forwardRef(() => AuthModule),
    forwardRef(() => GroupsModule),
  ],
})
export class SchedulesModule {}
