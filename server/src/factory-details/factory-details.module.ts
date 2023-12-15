import { Module } from '@nestjs/common';
import { FactoryDetailsService } from './factory-details.service';
import { FactoryDetailsController } from './factory-details.controller';
import { PostgressModule } from 'src/postgress/postgress.module';

@Module({
  imports: [PostgressModule],
  providers: [FactoryDetailsService],
  controllers: [FactoryDetailsController],
})
export class FactoryDetailsModule {}
