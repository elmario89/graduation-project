import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../enums/user-role.enum';
import { UserDto } from '../../auth/dto/user-dto';

export class CreateStudentDto extends UserDto {
  @ApiProperty({ example: UserRole.Student, description: 'Student role' })
  readonly role: UserRole;

  @ApiProperty({ example: '4262', description: 'Student group' })
  readonly groupId: string;
}
