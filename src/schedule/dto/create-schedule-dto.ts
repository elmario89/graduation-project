import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Group id',
  })
  readonly groupId: string;

  @ApiProperty({ example: 'Schedule name', description: 'Schedule name' })
  readonly name: string;
}
