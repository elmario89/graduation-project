import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule-dto';
import { InjectModel } from '@nestjs/sequelize';
import { Schedule } from './schedule.model';
import { GetScheduleByGroupAndDisciplineDto } from './dto/get-schedule-by-group-and-discipline-dto';
import { Discipline } from 'src/disciplines/discipline.model';
import { Location } from 'src/locations/location.model';
import { Group } from 'src/groups/group.model';
import { Teacher } from 'src/teachers/teacher.model';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule) private scheduleRepository: typeof Schedule,
  ) {}

  async addSchedule(dto: CreateScheduleDto) {
    return await this.scheduleRepository.create(dto);
  }

  async updateSchedule(dto: CreateScheduleDto & { id: string }) {
    return await this.scheduleRepository.update(
      { ...dto },
      { where: { id: dto.id } },
    );
  }

  async deleteSchedule(id: string) {
    return await this.scheduleRepository.destroy({ where: { id } });
  }

  async getScheduleByGroupId(groupId: string) {
    return await this.scheduleRepository.findAll({
      where: { groupId },
      include: { all: true },
    });
  }

  async getScheduleByTeacherId(teacherId: string) {
    return await this.scheduleRepository.findAll({
      where: { teacherId },
      include: { all: true },
    });
  }

  async getScheduleById(id: string) {
    return await this.scheduleRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async getScheduleByGroupAndDiscipline(
    dto: GetScheduleByGroupAndDisciplineDto,
  ) {
    const { disciplineId, groupId } = dto;
    return await this.scheduleRepository.findAll({
      where: { groupId, disciplineId },
      include: [
        {
          model: Discipline,
        },
        {
          model: Location,
        },
        {
          model: Group,
        },
        {
          model: Teacher,
        },
      ],
    });
  }

  async getAllSchedules() {
    return await this.scheduleRepository.findAll({
      include: { all: true },
      order: [['updatedAt', 'DESC']],
    });
  }
}
