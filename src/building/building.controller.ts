import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Building } from './building.model';
import { CreateBuildingDto } from './dto/create-building-dto';
import { BuildingsService } from './building.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { Group } from '../groups/group.model';
import { Faculty } from '../faculties/faculty.model';

@ApiTags('Buildings')
@Controller('building')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @ApiOperation({ summary: 'Create building' })
  @ApiResponse({ status: 200, type: Building })
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  create(@Body() buildingDto: CreateBuildingDto) {
    return this.buildingsService.createBuilding(buildingDto);
  }

  @ApiOperation({ summary: 'Update building' })
  @ApiResponse({ status: 200, type: Building })
  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() buildingDto: CreateBuildingDto) {
    return this.buildingsService.updateBuilding({ ...buildingDto, id });
  }

  @ApiOperation({ summary: 'Get all buildings' })
  @ApiResponse({ status: 200, type: Building })
  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  getAllBuildings() {
    return this.buildingsService.getAllBuildings();
  }

  @ApiOperation({ summary: 'Delete building' })
  @ApiResponse({ status: 200, type: Group })
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  delete(@Param('id') id: string) {
    return this.buildingsService.deleteBuilding(id);
  }

  @ApiOperation({ summary: 'Get building by id' })
  @ApiResponse({ status: 200, type: Faculty })
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getFacultyById(@Param('id') id: string) {
    return this.buildingsService.getBuildingById(id);
  }
}
