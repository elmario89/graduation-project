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
}
