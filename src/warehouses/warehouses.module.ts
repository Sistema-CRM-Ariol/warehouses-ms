import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [WarehousesController],
  providers: [WarehousesService],
  imports: [PrismaModule]
})
export class WarehousesModule {}
