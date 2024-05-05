import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from '../schedule/schedule.model';

export interface LocationCreationAttrs {
  buildingNumber: number;
  auditory: number;
  floor: number;
  address: string;
  coordinates: { type: string; coordinates: number[][][] };
}

@Table({ tableName: 'locations' })
export class Location extends Model<Location, LocationCreationAttrs> {
  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Unique identificator',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
  })
  id: string;

  @ApiProperty({
    example: '2',
    description: 'Building number',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  buildingNumber: number;

  @ApiProperty({
    example: '2',
    description: 'auditory number',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  auditory: number;

  @ApiProperty({
    example: '2',
    description: 'floor number',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  floor: number;

  @ApiProperty({
    example: 'Улица  пушкина',
    description: 'address',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  address: string;

  @ApiProperty({
    example: '[25, 25]',
    description: 'Coordinates',
  })
  @Column({
    type: DataType.GEOMETRY('POLYGON'),
    allowNull: false,
  })
  coordinates: { coordinates: { coordinates: number[][] } };

  @HasMany(() => Schedule)
  schedules: Schedule[];
}
