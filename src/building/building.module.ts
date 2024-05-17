import { forwardRef, Module } from '@nestjs/common';
import { BuildingsService } from './building.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { BuildingsController } from './building.controller';
import { Building } from './building.model';
import { Auditory } from 'src/auditory/auditory.model';

@Module({
  providers: [BuildingsService],
  controllers: [BuildingsController],
  imports: [
    SequelizeModule.forFeature([Building, Auditory]),
    forwardRef(() => AuthModule),
  ],
  exports: [BuildingsService],
})
export class BuildingsModule {}
