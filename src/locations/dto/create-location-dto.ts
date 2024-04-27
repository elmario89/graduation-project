import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({
    example: 'Дискретная математика',
    description: 'Discipline name',
  })
  readonly buildingNumber: number;

  @ApiProperty({
    example: 'Дискретная математика',
    description: 'Discipline name',
  })
  readonly floor: number;

  @ApiProperty({
    example: 'Дискретная математика',
    description: 'Discipline name',
  })
  readonly auditory: number;

  @ApiProperty({
    example: 'Дискретная математика',
    description: 'Discipline name',
  })
  readonly address: string;

  @ApiProperty({
    example: 'Дискретная математика',
    description: 'Discipline name',
  })
  readonly coordinates: number[];
}
