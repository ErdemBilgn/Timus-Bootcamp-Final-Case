import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ElasticModule } from './elastic/elastic.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    ElasticModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
