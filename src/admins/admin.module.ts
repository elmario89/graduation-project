import { forwardRef, Module } from '@nestjs/common';
import { AdminsController } from './admin.controller';
import { AdminsService } from './admin.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService],
  imports: [SequelizeModule.forFeature([Admin]), forwardRef(() => AuthModule)],
  exports: [AdminsService],
})
export class AdminsModule {}
