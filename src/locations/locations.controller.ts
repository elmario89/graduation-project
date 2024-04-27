import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Location } from './location.model';
import { CreateLocationDto } from './dto/create-location-dto';
import { LocationsService } from './locations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { Group } from '../groups/group.model';
import { Faculty } from '../faculties/faculty.model';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @ApiOperation({ summary: 'Create location' })
  @ApiResponse({ status: 200, type: Location })
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  create(@Body() locationDto: CreateLocationDto) {
    return this.locationsService.createLocation(locationDto);
  }

  @ApiOperation({ summary: 'Get all locations' })
  @ApiResponse({ status: 200, type: Location })
  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  getAllLocations() {
    return this.locationsService.getAllLocations();
  }

  @ApiOperation({ summary: 'Delete location' })
  @ApiResponse({ status: 200, type: Group })
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  delete(@Param('id') id: string) {
    return this.locationsService.deleteLocation(id);
  }

  @ApiOperation({ summary: 'Get location by id' })
  @ApiResponse({ status: 200, type: Faculty })
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getFacultyById(@Param('id') id: string) {
    return this.locationsService.getLocationById(id);
  }
}
