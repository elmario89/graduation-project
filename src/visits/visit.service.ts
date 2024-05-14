import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit-dto';
import { InjectModel } from '@nestjs/sequelize';
import { Visit } from './visit.model';
import { Schedule } from 'src/schedule/schedule.model';
import { Location } from 'src/locations/location.model';
import * as pointInPolygon from 'point-in-polygon';
import { GetVisitByScheduleAndStudent } from './dto/get-visit-by-schedule-and-student-dto';

@Injectable()
export class VisitsService {
  constructor(
    @InjectModel(Visit) private visitRepository: typeof Visit,
    @InjectModel(Schedule) private scheduleRepository: typeof Schedule,
    @InjectModel(Location) private locationRepository: typeof Location,
  ) {}

  async createVisit(dto: CreateVisitDto, forTeacher?: boolean) {
    if (!forTeacher) {
      const { locationId } = await this.scheduleRepository.findOne({
        where: { id: dto.scheduleId },
      });

      const { coordinates } = await this.locationRepository.findOne({
        where: { id: locationId },
      });

      const { lng, lat } = dto.coordinates;
      const userLocation = [lng, lat];
      const polygon = coordinates.coordinates[0];

      if (!pointInPolygon(userLocation, polygon)) {
        throw new HttpException(
          'You are not inside auditory',
          HttpStatus.FORBIDDEN,
        );
      }
      return;
    }

    await this.visitRepository.create(dto);

    const { scheduleId, studentId } = dto;

    return this.getVisitByScheduleAndStudent({ scheduleId, studentId });
  }

  async deleteVisit(dto: {
    id: string;
    studentId: string;
    scheduleId: string;
  }) {
    const { id, scheduleId, studentId } = dto;
    await this.visitRepository.destroy({ where: { id } });

    return this.getVisitByScheduleAndStudent({ scheduleId, studentId });
  }

  async getVisitByScheduleAndStudent(dto: GetVisitByScheduleAndStudent) {
    const { scheduleId, studentId } = dto;
    return await this.visitRepository.findAll({
      where: {
        scheduleId,
        studentId,
      },
    });
  }

  async getVisitBySchedule(scheduleId: string) {
    return await this.visitRepository.findAll({
      where: { scheduleId },
    });
  }
}
