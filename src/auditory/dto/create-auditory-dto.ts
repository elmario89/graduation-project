import { ApiProperty } from '@nestjs/swagger';
import { Coordinate } from 'src/types/coordinate';

export class CreateAuditoryDto {
  @ApiProperty({
    example: '2',
    description: 'Floor',
  })
  readonly floor: number;

  @ApiProperty({
    example: 'Number',
    description: 'Auditory number',
  })
  readonly number: number;

  @ApiProperty({
    example: '[lat, lng]',
    description: 'Coordinates',
  })
  readonly coordinates: Coordinate[];
}
