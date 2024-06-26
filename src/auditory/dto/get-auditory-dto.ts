import { ApiProperty } from '@nestjs/swagger';
import { Day } from 'src/enums/day.enum';

export class GetAuditoriesDto {
  @ApiProperty({
    example: Day.Monday,
    description: 'Day',
  })
  readonly day: Day;

  @ApiProperty({
    example: '9:40',
    description: 'Time',
  })
  readonly time: string;
}
