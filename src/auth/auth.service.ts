import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user-dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: UserDto) {
    const user = await this.validateUser(userDto);
    return await this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { login: user.login, id: user.id, role: user.role };

    return this.jwtService.sign(payload);
  }

  private async validateUser(userDto: UserDto) {
    const user = await this.usersService.getUsersByLogin(userDto.login);
    const passwordEquals = await compare(userDto.password, user.password);

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Invalid login credentials' });
  }
}
