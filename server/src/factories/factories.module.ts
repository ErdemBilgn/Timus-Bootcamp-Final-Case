import { Module } from '@nestjs/common';
import { FactoriesController } from './factories.controller';
import { FactoriesService } from './factories.service';
import { PostgressModule } from 'src/postgress/postgress.module';

@Module({
  imports: [PostgressModule],
  controllers: [FactoriesController],
  providers: [FactoriesService],
})
export class FactoriesModule {}
