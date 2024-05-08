import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { StudentsModule } from 'src/students/students.module';
import { TeacherModule } from 'src/teachers/teacher.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => StudentsModule),
    forwardRef(() => TeacherModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
