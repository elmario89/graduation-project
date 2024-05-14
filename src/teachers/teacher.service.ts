import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from './teacher.model';
import { CreateTeacherDto } from './dto/create-teacher-dto';
import { Discipline } from '../disciplines/discipline.model';
import { TeacherDisciplines } from './teacher-disciplines.model';
import { Op } from 'sequelize';
import { Schedule } from 'src/schedule/schedule.model';
import { Group } from 'src/groups/group.model';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher) private teacherRepository: typeof Teacher,
    @InjectModel(TeacherDisciplines)
    private teacherDisciplinesRepository: typeof TeacherDisciplines,
    @InjectModel(Discipline) private disciplinesRepository: typeof Discipline,
    @InjectModel(Schedule) private schedulesRepository: typeof Schedule,
    @InjectModel(Group) private groupsRepository: typeof Group,
  ) {}

  async createTeacher(dto: CreateTeacherDto) {
    const hashPassword = await hash(dto.password, 10);
    const teacher = await this.teacherRepository.create({
      ...dto,
      password: hashPassword,
    });
    dto.disciplineIds.map(async (disciplineId) => {
      await this.teacherDisciplinesRepository.create({
        teacherId: teacher.id,
        disciplineId: disciplineId,
      });
    });

    return teacher;
  }

  async getTeacherByLogin(login: string) {
    return await this.teacherRepository.findOne({
      where: { login },
    });
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
      attributes: {
        exclude: ['role', 'password'],
      },
      order: [['updatedAt', 'DESC']],
    });
  }

  async deleteTeacher(id: string) {
    return await this.teacherRepository.destroy({ where: { id } });
  }

  async getTeacherGroups(teacherId: string, disciplineId: string) {
    const schedules = await this.schedulesRepository.findAll({
      where: { teacherId, disciplineId },
    });

    return await this.groupsRepository.findAll({
      where: {
        id: {
          [Op.in]: schedules.map((d) => d.groupId),
        },
      },
    });
  }

  async getTeacherDisciplines(teacherId: string) {
    const teacherDisciplines = await this.teacherDisciplinesRepository.findAll({
      where: { teacherId },
    });

    return await this.disciplinesRepository.findAll({
      where: {
        id: {
          [Op.in]: teacherDisciplines.map((d) => d.disciplineId),
        },
      },
    });
  }

  async updateTeacher(dto: CreateTeacherDto & { id: string }) {
    await this.teacherRepository.update(
      { name: dto.name, surname: dto.surname },
      { where: { id: dto.id } },
    );

    await this.teacherDisciplinesRepository.destroy({
      where: { teacherId: dto.id },
    });

    await Promise.all(
      dto.disciplineIds.map(async (disciplineId) => {
        await this.teacherDisciplinesRepository.create({
          teacherId: dto.id,
          disciplineId: disciplineId,
        });
      }),
    );

    return await this.teacherRepository.findOne({
      where: { id: dto.id },
      include: {
        model: Discipline,
      },
    });
  }
}
