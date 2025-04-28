import { Module } from '@nestjs/common';
import { NatsModule } from './transports/nats.module';
import { PrismaModule } from './prisma/prisma.module';
import { WarehousesModule } from './warehouses/warehouses.module';

@Module({
  imports: [NatsModule, PrismaModule, WarehousesModule],
})
export class AppModule {}
