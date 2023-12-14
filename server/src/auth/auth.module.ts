import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ElasticModule } from 'src/elastic/elastic.module';

@Module({
  imports: [ElasticModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
