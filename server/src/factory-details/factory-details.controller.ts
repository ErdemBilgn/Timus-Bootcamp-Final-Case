import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { FactoryDetailsDto } from './dto';
import { FactoryDetailsService } from './factory-details.service';

@Controller('factory-details')
export class FactoryDetailsController {
  constructor(private readonly factoryDetailsService: FactoryDetailsService) {}

  // GET ALL ROUTE
  @HttpCode(HttpStatus.OK)
  @Public()
  @Get()
  getAllFactoryDetails() {
    return this.factoryDetailsService.getAllFactoryDetails();
  }

  // GET ONE BY ID ROUTE
  @HttpCode(HttpStatus.OK)
  @Public()
  @Get(':id')
  getSingleFactoryDetail(@Param('id') id: number) {
    return this.factoryDetailsService.getSingleFactoryDetail(id);
  }

  // CREATE ONE ROUTE
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post()
  insertFactoryDetails(@Body() dto: FactoryDetailsDto) {
    return this.factoryDetailsService.insertFactoryDetails(dto);
  }

  // UPDATE ONE ROUTE
  @HttpCode(HttpStatus.OK)
  @Public()
  @Put(':id')
  updateSingleFactoryDetail(
    @Param('id') id: number,
    @Body() dto: FactoryDetailsDto,
  ) {
    return this.factoryDetailsService.updateSingleFactoryDetail(id, dto);
  }

  // DELETE ONE ROUTE
  @HttpCode(HttpStatus.OK)
  @Public()
  @Delete(':id')
  deleteSingleFactoryDetail(@Param('id') id: number) {
    return this.factoryDetailsService.deleteSıngleFactoryDetail(id);
  }

  // GET ALL DETAILS FOR FACTORY BY firm_id
  @Public()
  @Get('factory-id/:firmId')
  getAllDetailsForFactory(@Param('firmId') firmId: number) {
    return this.factoryDetailsService.getAllDetailsForFactory(firmId);
  }

  // DELETE ALL DETAILS FOR FACTORY BY firm_id
  @Public()
  @Delete('factory-id/:firmId')
  deleteAllDetailsForFactory(@Param('firmId') firmId: number) {
    return this.factoryDetailsService.deleteAllDetalsForFactory(firmId);
  }
}
