import { ApiProperty } from '@nestjs/swagger';
import { DayOfWeek } from '../../enums/day-of-week.enum';

export class CreateScheduleDto {
  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Group id',
  })
  readonly groupId: string;

  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Group id',
  })
  readonly teacherId: string;

  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Discipline id',
  })
  readonly disciplineId: string;

  @ApiProperty({
    example: '23:11:08',
    description: 'Time',
  })
  readonly time: Date;

  @ApiProperty({ example: DayOfWeek.Monday, description: 'Day of the week' })
  readonly dayOfWeek: DayOfWeek;
}
