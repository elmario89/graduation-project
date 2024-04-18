import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './group.model';
import { CreateGroupDto } from './dto/create-group-dto';
import { Student } from '../students/student.model';
import { Schedule } from '../schedule/schedule.model';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group) private groupRepository: typeof Group) {}

  async createGroup(dto: CreateGroupDto) {
    return await this.groupRepository.create(dto);
  }

  async getGroupById(id: string) {
    return await this.groupRepository.findOne({
      where: { id },
      include: [
        {
          model: Student,
          attributes: {
            exclude: ['password', 'groupId'],
          },
        },
        {
          model: Schedule,
          attributes: {
            exclude: ['groupId'],
          },
        },
      ],
    });
  }

  async getAllGroups() {
    return await this.groupRepository.findAll({
      order: [['updatedAt', 'DESC']],
    });
  }
}
