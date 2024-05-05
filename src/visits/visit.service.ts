import { Injectable } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit-dto';
import { InjectModel } from '@nestjs/sequelize';
import { Visit } from './visit.model';
import { SchedulesService } from 'src/schedule/schedules.service';

@Injectable()
export class VisitsService {
  constructor(
    @InjectModel(Visit) private visitRepository: typeof Visit,
    private readonly scheduleService: SchedulesService,
  ) {}

  async createVisit(dto: CreateVisitDto) {
    const schedule = await this.scheduleService.getScheduleById(dto.scheduleId);
    console.log(schedule);
    return await this.visitRepository.create(dto);
  }
}
