import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FactoriesService } from './factories.service';
import { Public } from 'src/common/decorators';
import { FactoriesDto } from './dto';

@Controller('factories')
export class FactoriesController {
  constructor(private readonly factoriesService: FactoriesService) {}

  // GET ALL ROUTE
  @Get()
  getAllFactories() {
    return this.factoriesService.getAllFactories();
  }

  // GET ONE BY ID ROUTE
  @Get(':id')
  getSingleFactory(@Param('id') id: number) {
    return this.factoriesService.getSingleFactory(id);
  }

  // CREATE ROUTE
  @Post()
  insertFactory(@Body() dto: FactoriesDto) {
    return this.factoriesService.insertFactory(dto);
  }

  // UPDATE ROUTE
  @Put(':id')
  updateSingleFactory(@Param('id') id: number, @Body() dto: FactoriesDto) {
    return this.factoriesService.updateFactory(id, dto);
  }

  // DELETE ROUTE
  @Delete(':id')
  deleteSingleFactory(@Param('id') id: number) {
    return this.factoriesService.deleteSingleFactory(id);
  }

  @Post('createFactoryTable')
  createTable() {
    return this.factoriesService.createFactoryTable();
  }
}
