import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from '../../schedule/schedule.model';

export class CreateGroupDto {
  @ApiProperty({ example: '4262', description: 'Group name' })
  readonly name: string;

  @ApiProperty({
    example:
      "[{ time: '2024-04-14 19:32:51.99+03', teacherId: '64aedb31-0f62-4146-a642-cac3be239763', disciplineId: '64aedb31-0f62-4146-a642-cac3be239763', 'addressId: '64aedb31-0f62-4146-a642-cac3be239763' }]",
    description: 'Group description',
  })
  readonly schedule: Schedule[];
}
