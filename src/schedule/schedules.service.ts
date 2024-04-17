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

  async getAllSchedules() {
    return await this.scheduleRepository.findAll({
      include: { all: true },
      order: [['updatedAt', 'DESC']],
    });
  }
}
