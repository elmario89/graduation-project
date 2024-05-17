import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Building } from './building.model';
import { CreateBuildingDto } from './dto/create-building-dto';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectModel(Building) private buildingRepository: typeof Building,
  ) {}

  async createBuilding(dto: CreateBuildingDto) {
    return await this.buildingRepository.create(dto);
  }

  async updateBuilding(dto: CreateBuildingDto & { id: string }) {
    await this.buildingRepository.update(dto, { where: { id: dto.id } });

    return this.getBuildingById(dto.id);
  }

  async deleteBuilding(id: string) {
    return await this.buildingRepository.destroy({ where: { id } });
  }

  async getAllBuildings() {
    return await this.buildingRepository.findAll({
      order: [['updatedAt', 'DESC']],
    });
  }

  async getBuildingById(id: string) {
    return await this.buildingRepository.findOne({
      where: { id },
    });
  }
}
