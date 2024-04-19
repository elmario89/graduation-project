import { forwardRef, Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Group } from './group.model';
import { GroupsController } from './groups.controller';
import { Schedule } from '../schedule/schedule.model';
import { Faculty } from '../faculties/faculty.model';

@Module({
  providers: [GroupsService],
  controllers: [GroupsController],
  imports: [
    SequelizeModule.forFeature([Schedule, Group, Faculty]),
    forwardRef(() => AuthModule),
  ],
  exports: [GroupsService],
})
export class GroupsModule {}
