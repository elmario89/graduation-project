import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from '../../schedule/schedule.model';
import { Test } from '../group.model';
import { Column, DataType } from 'sequelize-typescript';

export class CreateGroupDto {
  @ApiProperty({ example: '4262', description: 'Group name' })
  readonly name: string;

  @ApiProperty({
    example:
      "[{ time: '2024-04-14 19:32:51.99+03', teacherId: '64aedb31-0f62-4146-a642-cac3be239763', disciplineId: '64aedb31-0f62-4146-a642-cac3be239763', 'addressId: '64aedb31-0f62-4146-a642-cac3be239763' }]",
    description: 'Group description',
  })
  readonly schedules: Schedule[];

  @ApiProperty({
    example: '2024-04-14 23:11:08.371+03',
    description: 'Education start date',
  })
  @Column({ type: DataType.DATE, allowNull: false })
  start: Date;

  @ApiProperty({
    example: '2024-04-14 23:11:08.371+03',
    description: 'Education finish date',
  })
  @Column({ type: DataType.DATE, allowNull: false })
  finish: Date;
}
