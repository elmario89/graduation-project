import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateStudentVisitDto } from './dto/create-student-visit-dto';
import { InjectModel } from '@nestjs/sequelize';
import { StudentVisit } from './student-visit.model';
import { Schedule } from 'src/schedule/schedule.model';
import { Auditory } from 'src/auditory/auditory.model';
import * as pointInPolygon from 'point-in-polygon';
import { GetStudentVisitByScheduleAndStudent } from './dto/get-student-visit-by-schedule-and-student-dto';
import { Op } from 'sequelize';
import { Coordinate } from 'src/types/coordinate';

@Injectable()
export class StudentVisitsService {
  constructor(
    @InjectModel(StudentVisit) private visitRepository: typeof StudentVisit,
    @InjectModel(Schedule) private scheduleRepository: typeof Schedule,
    @InjectModel(Auditory) private auditoryRepository: typeof Auditory,
  ) { }

  async createStudentVisit(dto: CreateStudentVisitDto, forTeacher?: boolean) {
    if (!forTeacher) {
      const { auditoryId } = await this.scheduleRepository.findOne({
        where: { id: dto.scheduleId },
      });

      const { coordinates } = await this.auditoryRepository.findOne({
        where: { id: auditoryId },
      });
      const { lng, lat } = dto.coordinates;

      const userAuditory = [lat, lng];
      const polygon = coordinates.coordinates[0];

      if (!pointInPolygon(userAuditory, polygon)) {
        throw new HttpException(
          'You are not inside auditory',
          HttpStatus.FORBIDDEN,
        );
      }
    }
    await this.visitRepository.create(dto);
  }

  async deleteStudentVisit(dto: {
    id: string;
  }) {
    const { id } = dto;
    await this.visitRepository.destroy({ where: { id } });
  }

  async getStudentVisitByScheduleAndStudent(dto: GetStudentVisitByScheduleAndStudent) {
    const { scheduleIds, studentId } = dto;
    return await this.visitRepository.findAll({
      where: {
        studentId,
        scheduleId: {
          [Op.in]: scheduleIds,
        },
      },
    });
  }

  async getStudentVisitBySchedule(scheduleIds: string[]) {
    return await this.visitRepository.findAll({
      where: {
        scheduleId: {
          [Op.in]: scheduleIds,
        },
      },
    });
  }
}
