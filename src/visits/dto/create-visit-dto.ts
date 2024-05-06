import { ApiProperty } from '@nestjs/swagger';
import { Coordinate } from 'src/types/coordinate';

export class CreateVisitDto {
  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Student id',
  })
  readonly studentId: string;

  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Schedule id',
  })
  readonly scheduleId: string;

  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Date',
  })
  readonly date: Date;

  @ApiProperty({
    example: '{ lng: 55.797258, lat: 49.134325 }',
    description: 'Coordinates',
  })
  readonly coordinates: Coordinate;
}
