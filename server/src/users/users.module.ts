import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ElasticModule } from 'src/elastic/elastic.module';

@Module({
  imports: [ElasticModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
