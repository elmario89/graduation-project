import { ApiProperty } from '@nestjs/swagger';

export class GetStudentByGroupDto {
  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Student group id',
  })
  readonly groupId: string;
}
