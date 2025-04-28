import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [WarehousesController],
  providers: [WarehousesService],
  imports: [PrismaModule, NatsModule]
})
export class WarehousesModule {}
