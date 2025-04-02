import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { WarehousesModule } from './warehouses/warehouses.module';

@Module({
  imports: [PrismaModule, WarehousesModule],
})
export class AppModule {}
