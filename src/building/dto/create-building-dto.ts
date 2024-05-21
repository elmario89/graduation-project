import { ApiProperty } from '@nestjs/swagger';

export class CreateBuildingDto {
  @ApiProperty({
    example: '2',
    description: 'Bulding number',
  })
  readonly number: number;

  @ApiProperty({
    example: 'Улица Пушкина',
    description: 'Bulding address',
  })
  readonly address: string;
}
