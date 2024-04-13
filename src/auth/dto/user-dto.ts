import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'mister', description: 'User login' })
  readonly login: string;
  @ApiProperty({ example: 'mister', description: 'User password' })
  readonly password: string;
  @ApiProperty({ example: 'Mikhail', description: 'User name' })
  readonly name: string;
  @ApiProperty({ example: 'Smirnov', description: 'User surname' })
  readonly surname: string;
}
