import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Discipline } from './discipline.model';
import { CreateDisciplineDto } from './dto/create-discipline-dto';
import { Teacher } from '../teachers/teacher.model';
import { Faculty } from 'src/faculties/faculty.model';

@Injectable()
export class DisciplinesService {
  constructor(
    @InjectModel(Discipline) private disciplineRepository: typeof Discipline,
  ) {}

  async createDiscipline(dto: CreateDisciplineDto) {
    const discipline = await this.disciplineRepository.create(dto);
    await discipline.$set(
      'teachers',
      dto.teachers?.length ? [...dto.teachers] : [],
    );

    return discipline;
  }

  async deleteDiscipline(id: string) {
    return await this.disciplineRepository.destroy({ where: { id } });
  }

  async getAllDisciplines() {
    return await this.disciplineRepository.findAll({
      include: [
        {
          model: Teacher,
        },
        {
          model: Faculty,
        },
      ],
      order: [['updatedAt', 'DESC']],
    });
  }

  async getDisciplineById(id: string) {
    return await this.disciplineRepository.findOne({
      where: { id },
      include: [
        {
          model: Teacher,
        },
        {
          model: Faculty,
        },
      ],
    });
  }
}
