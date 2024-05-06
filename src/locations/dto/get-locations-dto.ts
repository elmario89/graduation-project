import { ApiProperty } from '@nestjs/swagger';
import { Day } from 'src/enums/day.enum';

export class GetLocationsDto {
  @ApiProperty({
    example: Day.Monday,
    description: 'Day',
  })
  readonly day: Day;

  @ApiProperty({
    example: 900,
    description: 'Time',
  })
  readonly time: number;
}
