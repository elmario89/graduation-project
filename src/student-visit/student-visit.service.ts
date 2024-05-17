import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentVisitDto } from './dto/create-student-visit-dto';
import { InjectModel } from '@nestjs/sequelize';
import { StudentVisit } from './student-visit.model';
import { Schedule } from 'src/schedule/schedule.model';
import { Auditory } from 'src/auditory/auditory.model';
import * as pointInPolygon from 'point-in-polygon';
import { GetStudentVisitByScheduleAndStudent } from './dto/get-student-visit-by-schedule-and-student-dto';

@Injectable()
export class StudentVisitsService {
  constructor(
    @InjectModel(StudentVisit) private visitRepository: typeof StudentVisit,
    @InjectModel(Schedule) private scheduleRepository: typeof Schedule,
    @InjectModel(Auditory) private auditoryRepository: typeof Auditory,
  ) {}

  async createStudentVisit(dto: CreateStudentVisitDto, forTeacher?: boolean) {
    if (!forTeacher) {
      const { auditoryId } = await this.scheduleRepository.findOne({
        where: { id: dto.scheduleId },
      });

      const { coordinates } = await this.auditoryRepository.findOne({
        where: { id: auditoryId },
      });

      const { lng, lat } = dto.coordinates;
      const userAuditory = [lng, lat];
      const polygon = coordinates.coordinates[0];

      if (!pointInPolygon(userAuditory, polygon)) {
        throw new HttpException(
          'You are not inside auditory',
          HttpStatus.FORBIDDEN,
        );
      }
      return;
    }

    await this.visitRepository.create(dto);

    const { scheduleId, studentId } = dto;

    return this.getStudentVisitByScheduleAndStudent({ scheduleId, studentId });
  }

  async deleteStudentVisit(dto: {
    id: string;
    studentId: string;
    scheduleId: string;
  }) {
    const { id, scheduleId, studentId } = dto;
    await this.visitRepository.destroy({ where: { id } });

    return this.getStudentVisitByScheduleAndStudent({ scheduleId, studentId });
  }

  async getStudentVisitByScheduleAndStudent(dto: GetStudentVisitByScheduleAndStudent) {
    const { scheduleId, studentId } = dto;
    return await this.visitRepository.findAll({
      where: {
        scheduleId,
        studentId,
      },
    });
  }

  async getStudentVisitBySchedule(scheduleId: string) {
    return await this.visitRepository.findAll({
      where: { scheduleId },
    });
  }
}
