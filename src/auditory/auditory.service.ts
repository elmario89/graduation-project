import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Auditory } from './auditory.model';
import { CreateAuditoryDto } from './dto/create-auditory-dto';
import { GetAuditoriesDto } from './dto/get-auditory-dto';
import { Schedule } from 'src/schedule/schedule.model';
import { Op } from 'sequelize';
import * as hull from 'geo-convex-hull';
import { Building } from 'src/building/building.model';

@Injectable()
export class AuditoriesService {
  constructor(
    @InjectModel(Auditory) private auditoryRepository: typeof Auditory,
    @InjectModel(Schedule) private scheduleRepository: typeof Schedule,
  ) {}

  async createAuditory(dto: CreateAuditoryDto) {
    const mapped = dto.coordinates.map((c) => ({
      longitude: Number(c.lng),
      latitude: Number(c.lat),
    }));
    const hulled = hull(mapped).map((t) => ({
      lng: t.longitude,
      lat: t.latitude,
    }));

    const polygon = {
      type: 'Polygon',
      coordinates: [[...hulled.map((c) => [Number(c.lng), Number(c.lat)])]],
    };
    return await this.auditoryRepository.create({
      ...dto,
      coordinates: polygon,
    });
  }

  async updateAuditory(dto: CreateAuditoryDto & { id: string }) {
    const mapped = dto.coordinates.map((c) => ({
      longitude: Number(c.lng),
      latitude: Number(c.lat),
    }));
    const hulled = hull(mapped).map((t) => ({
      lng: t.longitude,
      lat: t.latitude,
    }));

    const polygon = {
      type: 'Polygon',
      coordinates: [[...hulled.map((c) => [Number(c.lng), Number(c.lat)])]],
    };

    await this.auditoryRepository.update(
      // @ts-ignore
      { ...dto, coordinates: polygon },
      { where: { id: dto.id } },
    );

    return this.getAuditoryById(dto.id);
  }

  async deleteAuditory(id: string) {
    return await this.auditoryRepository.destroy({ where: { id } });
  }

  async getAllAuditories() {
    return await this.auditoryRepository.findAll({
      order: [['updatedAt', 'DESC']],
      attributes: { exclude: ['coordinates'] },
      include: [
        {
          model: Building,
        },
      ],
    });
  }

  async getAuditoryByTimeAndDay(dto: GetAuditoriesDto) {
    const { day, time } = dto;
    const schedules = await this.scheduleRepository.findAll({
      where: {
        timeStart: time,
        day,
      },
    });

    return await this.auditoryRepository.findAll({
      order: [['updatedAt', 'DESC']],
      attributes: { exclude: ['coordinates'] },
      where: {
        id: { [Op.notIn]: schedules.map((s) => s.auditoryId) },
      },
      include: [
        {
          model: Building,
        },
      ],
    });
  }

  async getAuditoryById(id: string) {
    const result = await this.auditoryRepository.findOne({
      where: { id },
      include: [
        {
          model: Building,
        },
      ],
    });

    const { floor, coordinates, number, building, buildingId } = result;

    return {
      id,
      number,
      floor,
      coordinates: coordinates.coordinates[0].map((c) => ({
        lng: c[0],
        lat: c[1],
      })),
      building,
      buildingId,
    };
  }
}
