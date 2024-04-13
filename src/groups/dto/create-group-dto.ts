import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({ example: '4262', description: 'Group name' })
  readonly name: string;
}
