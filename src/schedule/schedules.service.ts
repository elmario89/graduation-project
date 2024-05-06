import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule-dto';
import { InjectModel } from '@nestjs/sequelize';
import { Schedule } from './schedule.model';

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

  async getAllSchedules() {
    return await this.scheduleRepository.findAll({
      include: { all: true },
      order: [['updatedAt', 'DESC']],
    });
  }
}
