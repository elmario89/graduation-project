import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from './teacher.model';
import { CreateTeacherDto } from './dto/create-teacher-dto';
import { Discipline } from '../disciplines/discipline.model';
import { TeacherDiscipline } from './teacher-discipline.model';
import { Op } from 'sequelize';
import { Schedule } from 'src/schedule/schedule.model';
import { Group } from 'src/groups/group.model';
import { Faculty } from 'src/faculties/faculty.model';
import { TeacherFaculty } from './teacher-faculty.model';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher) private teacherRepository: typeof Teacher,
    @InjectModel(TeacherDiscipline)
    private teacherDisciplinesRepository: typeof TeacherDiscipline,
    @InjectModel(TeacherFaculty)
    private teacherFacultiesRepository: typeof TeacherFaculty,
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

    dto.facultiesIds.map(async (facultyId) => {
      await this.teacherFacultiesRepository.create({
        teacherId: teacher.id,
        facultyId: facultyId,
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
      include: [
        {
          model: Faculty,
        },
        {
          model: Discipline,
        },
      ],
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

  async getTeacherDiscipline(teacherId: string) {
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

    await this.teacherFacultiesRepository.destroy({
      where: { facultyId: dto.id },
    });

    await Promise.all(
      dto.disciplineIds.map(async (disciplineId) => {
        await this.teacherDisciplinesRepository.create({
          teacherId: dto.id,
          disciplineId,
        });
      }),
    );

    await Promise.all(
      dto.facultiesIds.map(async (facultyId) => {
        await this.teacherFacultiesRepository.create({
          teacherId: dto.id,
          facultyId,
        });
      }),
    );

    return await this.teacherRepository.findOne({
      where: { id: dto.id },
      include: [
        {
          model: Faculty,
        },
        {
          model: Discipline,
        },
      ],
    });
  }
}
