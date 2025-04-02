import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { PrismaService } from 'src/prisma/prisma.service';
import { FilterPaginationDto } from 'src/common/dto/filter-pagination.dto';

import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Injectable()
export class WarehousesService {

  constructor(private prisma: PrismaService) { }

  async create(createWarehouseDto: CreateWarehouseDto) {
    try {
      const warehouse = await this.prisma.warehouse.create({
        data: createWarehouseDto,
      });

      return {
        warehouse,
        message: 'Almacén registrado',
      };

    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: 'Error al registrar el almacén'
      })
    }
  }

  async findAll(filterPaginationDto: FilterPaginationDto) {
    const { page, limit, search, isActive } = filterPaginationDto;

    const filters: any[] = [];

    if (search) {
      filters.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
        ],
      });
    }

    // Si status viene definido, lo agregamos
    if (isActive !== undefined) {
      filters.push({ isActive });
    }

    // Si existen filtros, los combinamos en un AND; de lo contrario, la consulta no tiene filtro
    const whereClause = filters.length > 0 ? { AND: filters } : {};

    // Ejecutamos la consulta de conteo y búsqueda con el mismo whereClause
    const [totalWarehouses, warehouses] = await Promise.all([
      this.prisma.warehouse.count({
        where: whereClause,
      }),
      this.prisma.warehouse.findMany({
        take: limit,
        skip: (page! - 1) * limit!,
        orderBy: { updatedAt: 'desc' },
        where: { ...whereClause, },
      }),
    ]);

    const lastPage = Math.ceil(totalWarehouses / limit!);

    return {
      warehouses,
      meta: {
        page,
        lastPage,
        total: totalWarehouses,
      },
    };
  }

  findOne(id: string) {   
    return `This action returns a #${id} warehouse`;
  }

  async update(id: string, updateWarehouseDto: UpdateWarehouseDto) {
    try {
      const warehouse = await this.prisma.warehouse.update({
        where: {
          id: id
        },
        data: updateWarehouseDto
      });

      return {
        warehouse,
        message: 'Almacén actualizado con exito'
      };

    } catch (error) {

      if (error.code === 'P2025') {
        throw new RpcException({
          statusCode: 404,
          message: 'No se encontro el almacén'
        })
      }

      throw new RpcException({
        statusCode: 500,
        message: 'Error al actualizar el almacén'
      })
    }
  }
}
