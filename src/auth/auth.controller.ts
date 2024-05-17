import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user-dto';
import { Admin } from '../admins/admin.model';
import { Student } from 'src/students/student.model';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: Student })
  @Post('/login')
  login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }
}
