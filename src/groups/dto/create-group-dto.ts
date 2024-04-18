import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType } from 'sequelize-typescript';

export class CreateGroupDto {
  @ApiProperty({ example: '4262', description: 'Group name' })
  readonly name: string;

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
