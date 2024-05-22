import { ApiProperty } from '@nestjs/swagger';

export class GetStudentVisitByScheduleAndStudent {
  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Student id',
  })
  readonly studentId: string;

  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Schedule ids',
  })
  readonly scheduleIds: string[];

  // @ApiProperty({
  //   example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
  //   description: 'Group id',
  // })
  // readonly groupId: string;

  // @ApiProperty({
  //   example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
  //   description: 'Teacher id',
  // })
  // readonly teacherId: string;

  // @ApiProperty({
  //   example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
  //   description: 'Discipline id',
  // })
  // readonly disciplineId: string;
}
