import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user-dto';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const hashPassword = await hash(dto.password, 10);
    return await this.userRepository.create({ ...dto, password: hashPassword });
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUsersByLogin(login: string) {
    return await this.userRepository.findOne({
      where: { login },
      include: { all: true },
    });
  }
}
