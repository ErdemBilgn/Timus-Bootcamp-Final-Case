import { Module } from '@nestjs/common';
import { PostgressService } from './postgress.service';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Module({
  providers: [
    {
      provide: 'POOL',
      useFactory: async (configService: ConfigService) => {
        const URL = configService.get('ELEPHANTSQL_URL');
        const pool = new Pool({ connectionString: URL });
        return pool;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['POOL'],
})
export class PostgressModule {}
