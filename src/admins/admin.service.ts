import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './admin.model';
import { CreateAdminDto } from './dto/create-admin-dto';
import { hash } from 'bcryptjs';

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin) private adminRepository: typeof Admin) {}

  async createAdmin(dto: CreateAdminDto) {
    const hashPassword = await hash(dto.password, 10);
    return await this.adminRepository.create({
      ...dto,
      password: hashPassword,
    });
  }

  async getAllAdmins() {
    return await this.adminRepository.findAll();
  }

  async getAdminsByLogin(login: string) {
    return await this.adminRepository.findOne({
      where: { login },
      include: { all: true },
    });
  }
}
