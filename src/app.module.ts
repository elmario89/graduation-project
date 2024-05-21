import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminsModule } from './admins/admin.module';
import { ConfigModule } from '@nestjs/config';
import { Admin } from './admins/admin.model';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { Group } from './groups/group.model';
import { StudentsModule } from './students/students.module';
import { Student } from './students/student.model';
import { TeacherModule } from './teachers/teacher.module';
import { Teacher } from './teachers/teacher.model';
import { Discipline } from './disciplines/discipline.model';
import { DisciplinesModule } from './disciplines/disciplines.module';
import { TeacherDiscipline } from './teachers/teacher-discipline.model';
import { Schedule } from './schedule/schedule.model';
import { SchedulesModule } from './schedule/schedules.module';
import { StudentVisitsModule } from './student-visit/student-visit.module';
import { StudentVisit } from './student-visit/student-visit.model';
import { FacultiesModule } from './faculties/faculties.module';
import { Faculty } from './faculties/faculty.model';
import { AuditoriesModule } from './auditory/auditory.module';
import { Auditory } from './auditory/auditory.model';
import { TeacherFaculty } from './teachers/teacher-faculty.model';
import { BuildingsModule } from './building/building.module';
import { Building } from './building/building.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        Group,
        Student,
        Teacher,
        Discipline,
        TeacherDiscipline,
        TeacherFaculty,
        Schedule,
        StudentVisit,
        Faculty,
        Auditory,
        Building,
      ],
      autoLoadModels: true,
    }),
    AdminsModule,
    AuthModule,
    GroupsModule,
    StudentsModule,
    TeacherModule,
    DisciplinesModule,
    SchedulesModule,
    StudentVisitsModule,
    FacultiesModule,
    AuditoriesModule,
    BuildingsModule,
  ],
})
export class AppModule {}
