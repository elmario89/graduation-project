import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Faculty } from './faculty.model';
import { CreateFacultyDto } from './dto/create-faculty-dto';
import { Group } from '../groups/group.model';
@Injectable()
export class FacultiesService {
  constructor(
    @InjectModel(Faculty) private facultiesRepository: typeof Faculty,
  ) {}

  async createFaculty(dto: CreateFacultyDto) {
    return await this.facultiesRepository.create(dto);
  }

  async updateFaculty(dto: CreateFacultyDto & { id: string }) {
    return await this.facultiesRepository.update(
      { ...dto },
      { where: { id: dto.id } },
    );
  }

  async deleteFaculty(id: string) {
    return await this.facultiesRepository.destroy({ where: { id } });
  }

  async getAllFaculties() {
    return await this.facultiesRepository.findAll({
      order: [['updatedAt', 'DESC']],
      include: [
        {
          model: Group,
        },
      ],
    });
  }

  async getFacultyById(id: string) {
    return await this.facultiesRepository.findOne({
      where: { id },
      include: [
        {
          model: Group,
        },
      ],
    });
  }
}
