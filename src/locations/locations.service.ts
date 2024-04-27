import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Location } from './location.model';
import { CreateLocationDto } from './dto/create-location-dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location) private locationRepository: typeof Location,
  ) {}

  async createLocation(dto: CreateLocationDto) {
    const polygon = {
      type: 'Polygon',
      coordinates: [[...dto.coordinates]],
    };
    return await this.locationRepository.create({
      ...dto,
      coordinates: polygon,
    });
  }

  async deleteLocation(id: string) {
    return await this.locationRepository.destroy({ where: { id } });
  }

  async getAllLocations() {
    return await this.locationRepository.findAll({
      order: [['updatedAt', 'DESC']],
    });
  }

  async getLocationById(id: string) {
    return await this.locationRepository.findOne({
      where: { id },
    });
  }
}
