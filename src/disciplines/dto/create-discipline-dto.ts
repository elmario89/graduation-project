import { ApiProperty } from '@nestjs/swagger';

export class CreateDisciplineDto {
  @ApiProperty({
    example: 'Дискретная математика',
    description: 'Discipline name',
  })
  readonly name: string;

  @ApiProperty({
    example: [
      'd856b738-dda8-47e6-8be9-f2b2a69dc312',
      'd856b738-dda8-47e6-8be9-f2b2a69dc312',
    ],
    description: 'Discipline teachers',
  })
  readonly teachers?: string[];
}
