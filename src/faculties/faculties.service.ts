import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Faculty } from './faculty.model';
import { CreateFacultyDto } from './dto/create-faculty-dto';
@Injectable()
export class FacultiesService {
  constructor(
    @InjectModel(Faculty) private facultiesRepository: typeof Faculty,
  ) {}

  async createFaculty(dto: CreateFacultyDto) {
    return await this.facultiesRepository.create(dto);
  }

  async updateGroup(dto: CreateFacultyDto & { id: string }) {
    return await this.facultiesRepository.update(
      { ...dto },
      { where: { id: dto.id } },
    );
  }

  async getAllFaculties() {
    return await this.facultiesRepository.findAll({
      order: [['updatedAt', 'DESC']],
    });
  }

  async getFacultyById(id: string) {
    return await this.facultiesRepository.findOne({
      where: { id },
    });
  }
}
