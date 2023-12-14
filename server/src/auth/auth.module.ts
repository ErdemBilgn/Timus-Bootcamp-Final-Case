import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ElasticModule } from 'src/elastic/elastic.module';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports: [ElasticModule],
  providers: [AuthService, AtStrategy, RtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
