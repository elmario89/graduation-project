import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin-dto';
import { AdminsService } from './admin.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './admin.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@ApiTags('Admins')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({ summary: 'Create admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  create(@Body() userDto: CreateAdminDto) {
    return this.adminsService.createAdmin(userDto);
  }

  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  getAll() {
    return this.adminsService.getAllAdmins();
  }
}
