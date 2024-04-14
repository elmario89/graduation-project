import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.model';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { Group } from './groups/group.model';
import { StudentsModule } from './students/students.module';
import { Student } from './students/student.model';
import { TeacherModule } from './teachers/teacher.module';
import { Teacher } from './teachers/teacher.model';
import { Discipline } from './disciplines/discipline.model';
import { DisciplinesModule } from './disciplines/disciplines.module';
import { TeacherDisciplines } from './teachers/teacher-disciplines.model';

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
      models: [User, Group, Student, Teacher, Discipline, TeacherDisciplines],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    GroupsModule,
    StudentsModule,
    TeacherModule,
    DisciplinesModule,
  ],
})
export class AppModule {}
