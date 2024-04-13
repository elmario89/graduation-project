import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../enums/user-role.enum';
import { UserDto } from '../../auth/dto/user-dto';

export class CreateUserDto extends UserDto {
  @ApiProperty({ example: UserRole.Student, description: 'User role' })
  readonly role: UserRole;
}
