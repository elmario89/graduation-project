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
      coordinates: [
        [...dto.coordinates.map((c) => [Number(c.lng), Number(c.lat)])],
      ],
    };
    return await this.locationRepository.create({
      ...dto,
      coordinates: polygon,
    });
  }

  async updateLocation(dto: CreateLocationDto & { id: string }) {
    const polygon = {
      type: 'Polygon',
      coordinates: [
        [...dto.coordinates.map((c) => [Number(c.lng), Number(c.lat)])],
      ],
    };
    await this.locationRepository.update(
      // @ts-ignore
      {...dto, coordinates: polygon },
      { where: { id: dto.id } },
    );

    return this.getLocationById(dto.id);
  }

  async deleteLocation(id: string) {
    return await this.locationRepository.destroy({ where: { id } });
  }

  async getAllLocations() {
    return await this.locationRepository.findAll({
      order: [['updatedAt', 'DESC']],
      attributes: { exclude: ['coordinates'] },
    });
  }

  async getLocationById(id: string) {
    const result = await this.locationRepository.findOne({
      where: { id },
    });

    const { buildingNumber, floor, auditory, coordinates, address } = result;

    return {
      id,
      buildingNumber,
      floor,
      address,
      auditory,
      coordinates: coordinates.coordinates[0].map((c) => ({
        lng: c[0],
        lat: c[1],
      })),
    };
  }
}
