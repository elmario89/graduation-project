import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from '../schedule/schedule.model';
import { Building } from 'src/building/building.model';

export interface AuditoryCreationAttrs {
  buildingNumber: number;
  auditory: number;
  floor: number;
  address: string;
  coordinates: { type: string; coordinates: number[][][] };
}

@Table({ tableName: 'auditory' })
export class Auditory extends Model<Auditory, AuditoryCreationAttrs> {
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
    description: 'Auditory number',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  number: number;

  @ApiProperty({
    example: '2',
    description: 'floor number',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  floor: number;

  @ApiProperty({
    example: '[25, 25]',
    description: 'Coordinates',
  })
  @Column({
    type: DataType.GEOMETRY('POLYGON'),
    allowNull: false,
  })
  coordinates: { coordinates: { coordinates: number[][] } };

  @BelongsTo(() => Building)
  building: Building;

  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Bulding id',
  })
  @ForeignKey(() => Building)
  @Column({ type: DataType.UUID, allowNull: false })
  buildingId: string;

  @HasMany(() => Schedule)
  schedules: Schedule[];
}
