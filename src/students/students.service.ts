import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './student.model';
import { CreateStudentDto } from './dto/create-student-dto';
import { GroupsService } from '../groups/groups.service';
import { Group } from '../groups/group.model';

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

  async updateStudent(dto: CreateStudentDto & { id: string }) {
    return await this.studentRepository.update(
      { ...dto },
      { where: { id: dto.id } },
    );
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

  async deleteStudent(id: string) {
    return await this.studentRepository.destroy({ where: { id } });
  }

  async getStudentById(id: string) {
    return await this.studentRepository.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Group,
        },
      ],
    });
  }

  async getAllStudents() {
    console.log('here');
    return await this.studentRepository.findAll({
      attributes: { exclude: ['password', 'role'] },
      include: [
        {
          model: Group,
        },
      ],
      order: [['updatedAt', 'DESC']],
    });
  }
}
