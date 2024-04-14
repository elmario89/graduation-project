import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from './teacher.model';
import { CreateTeacherDto } from './dto/create-teacher-dto';
import { Discipline } from '../disciplines/discipline.model';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher) private teacherRepository: typeof Teacher,
  ) {}

  async createTeacher(dto: CreateTeacherDto) {
    const hashPassword = await hash(dto.password, 10);
    const teacher = await this.teacherRepository.create({
      ...dto,
      password: hashPassword,
    });
    await teacher.$set(
      'disciplines',
      dto.disciplines?.length ? [...dto.disciplines] : [],
    );

    return teacher;
  }

  async getTeacherById(id: string) {
    return await this.teacherRepository.findOne({
      where: { id },
      include: {
        model: Discipline,
        through: {
          attributes: [],
        },
      },
    });
  }

  async getAllTeachers() {
    return await this.teacherRepository.findAll({
      include: {
        model: Discipline,
        through: {
          attributes: [],
        },
      },
      order: [['updatedAt', 'DESC']],
    });
  }
}
