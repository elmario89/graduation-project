import { Injectable } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit-dto';
import { InjectModel } from '@nestjs/sequelize';
import { Visit } from './visit.model';

@Injectable()
export class VisitsService {
  constructor(@InjectModel(Visit) private visitRepository: typeof Visit) {}

  async createVisit(dto: CreateVisitDto) {
    return await this.visitRepository.create(dto);
  }
}
