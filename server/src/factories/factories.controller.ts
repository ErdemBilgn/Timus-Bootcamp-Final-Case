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
  @Public()
  @Get()
  getAllFactories() {
    return this.factoriesService.getAllFactories();
  }

  // GET ONE BY ID ROUTE
  @Public()
  @Get(':id')
  getSingleFactory(@Param('id') id: number) {
    return this.factoriesService.getSingleFactory(id);
  }

  // CREATE ROUTE
  @Public()
  @Post()
  insertFactory(@Body() dto: FactoriesDto) {
    return this.factoriesService.insertFactory(dto);
  }

  // UPDATE ROUTE
  @Public()
  @Put(':id')
  updateSingleFactory(@Param('id') id: number, @Body() dto: FactoriesDto) {
    return this.factoriesService.updateFactory(id, dto);
  }

  // DELETE ROUTE
  @Public()
  @Delete(':id')
  deleteSingleFactory(@Param('id') id: number) {
    return this.factoriesService.deleteSingleFactory(id);
  }

  @Public()
  @Post('createFactoryTable')
  createTable() {
    return this.factoriesService.createFactoryTable();
  }
}
