import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Auditory } from 'src/auditory/auditory.model';

export interface BuildingCreationAttrs {
  number: number;
  address: string;
}

@Table({ tableName: 'building' })
export class Building extends Model<Building, BuildingCreationAttrs> {
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
  number: number;

  @ApiProperty({
    example: 'Улица пушкина',
    description: 'Address',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  address: string;

  @HasMany(() => Auditory)
  disciplines: Auditory[];
}
