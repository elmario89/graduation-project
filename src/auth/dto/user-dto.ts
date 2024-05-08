import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/enums/user-role.enum';

export class UserDto {
  @ApiProperty({ example: 'mister', description: 'User login' })
  readonly login: string;
  @ApiProperty({ example: 'mister', description: 'User password' })
  readonly password: string;
  @ApiProperty({ example: 'Mikhail', description: 'User name' })
  readonly name: string;
  @ApiProperty({ example: 'Smirnov', description: 'User surname' })
  readonly surname: string;
  @ApiProperty({ example: 'Admin', description: 'User role' })
  readonly role: UserRole;
}
