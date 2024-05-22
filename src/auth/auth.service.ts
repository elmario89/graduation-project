import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user-dto';
import { AdminsService } from '../admins/admin.service';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../admins/admin.model';
import { compare } from 'bcryptjs';
import { UserRole } from 'src/enums/user-role.enum';
import { StudentsService } from 'src/students/students.service';
import { TeacherService } from 'src/teachers/teacher.service';
import { Student } from 'src/students/student.model';
import { Teacher } from 'src/teachers/teacher.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly studentsService: StudentsService,
    private readonly teachersService: TeacherService,
    private readonly jwtService: JwtService,
  ) { }

  async login(userDto: UserDto) {
    const user = await this.validateUser(userDto);
    return await this.generateToken(user);
  }

  private async generateToken(user: Admin | Student | Teacher) {
    const payload = { login: user.login, id: user.id, role: user.role };

    if (user.role === UserRole.Student) {
      const student = await this.studentsService.getStudentById(user.id);
      const { groupId } = student;

      return this.jwtService.sign({ ...payload, groupId });
    }

    return this.jwtService.sign(payload);
  }

  private async getUserByRole(userDto: UserDto) {
    switch (userDto.role) {
      case UserRole.Student: {
        return await this.studentsService.getStudentByLogin(userDto.login);
      }
      case UserRole.Teacher: {
        return await this.teachersService.getTeacherByLogin(userDto.login);
      }
      case UserRole.Admin: {
        return await this.adminsService.getAdminsByLogin(userDto.login);
      }
    }
  }

  private async validateUser(userDto: UserDto) {
    const user = await this.getUserByRole(userDto);

    if (!user) {
      throw new UnauthorizedException({ message: 'Логин не существует' });
    }

    const passwordEquals = await compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Неправильный пароль' });
  }
}
