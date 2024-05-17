import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Faculty } from './faculty.model';
import { Group } from '../groups/group.model';
import { FacultiesService } from './faculties.service';
import { FacultiesController } from './faculties.controller';
import { Teacher } from 'src/teachers/teacher.model';
import { Discipline } from 'src/disciplines/discipline.model';

@Module({
  providers: [FacultiesService],
  controllers: [FacultiesController],
  imports: [
    SequelizeModule.forFeature([Faculty, Group, Teacher, Discipline]),
    forwardRef(() => AuthModule),
  ],
  exports: [FacultiesService],
})
export class FacultiesModule {}
