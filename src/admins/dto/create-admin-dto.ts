import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../enums/user-role.enum';
import { UserDto } from '../../auth/dto/user-dto';

export class CreateAdminDto extends UserDto {
  @ApiProperty({ example: UserRole.Student, description: 'Admin role' })
  readonly role: UserRole;
}
