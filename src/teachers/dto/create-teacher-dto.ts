import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../enums/user-role.enum';
import { UserDto } from '../../auth/dto/user-dto';

export class CreateTeacherDto extends UserDto {
  @ApiProperty({ example: UserRole.Student, description: 'Teacher role' })
  readonly role: UserRole;

  @ApiProperty({
    example: [
      'd856b738-dda8-47e6-8be9-f2b2a69dc312',
      'd856b738-dda8-47e6-8be9-f2b2a69dc312',
    ],
    description: 'Teacher disciplines ids',
  })
  readonly disciplineIds: string[];
}
