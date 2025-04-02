import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';

@Controller()
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @MessagePattern('createWarehouse')
  create(@Payload() createWarehouseDto: CreateWarehouseDto) {
    return this.warehousesService.create(createWarehouseDto);
  }

  @MessagePattern('findAllWarehouses')
  findAll(@Payload() filterPaginationDto: FilterPaginationDto) {
    return this.warehousesService.findAll(filterPaginationDto);
  }

  @MessagePattern('findOneWarehouse')
  findOne(@Payload() id: string) {
    return this.warehousesService.findOne(id);
  }

  @MessagePattern('updateWarehouse')
  update(@Payload() payload: { id: string, updateWarehouseDto: UpdateWarehouseDto}) {
    return this.warehousesService.update(payload.id, payload.updateWarehouseDto);
  }
}
