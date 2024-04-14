import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './student.model';
import { CreateStudentDto } from './dto/create-student-dto';
import { GroupsService } from '../groups/groups.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student) private studentRepository: typeof Student,
    private readonly groupsService: GroupsService,
  ) {}

  async createStudent(dto: CreateStudentDto) {
    const hashPassword = await hash(dto.password, 10);
    return await this.studentRepository.create({
      ...dto,
      password: hashPassword,
    });
  }

  async getStudentsByGroup(groupId: string) {
    const students = await this.studentRepository.findAll({
      where: { groupId },
      attributes: { exclude: ['password', 'login', 'role'] },
    });

    const group = await this.groupsService.getGroupById(groupId);

    return {
      group,
      students,
    };
  }
}
