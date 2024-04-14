import { forwardRef, Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { StudentsService } from './students.service';
import { Student } from './student.model';
import { Group } from '../groups/group.model';
import { GroupsModule } from '../groups/groups.module';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [
    SequelizeModule.forFeature([Student, Group]),
    forwardRef(() => AuthModule),
    forwardRef(() => GroupsModule),
  ],
})
export class StudentsModule {}
