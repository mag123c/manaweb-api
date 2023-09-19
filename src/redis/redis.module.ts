import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import * as dotenv from 'dotenv';
import { RedisCacheService } from './redis.service';
import { CacheModule } from '@nestjs/cache-manager';
dotenv.config();

const cacheModule = CacheModule.register({
  useFactory: async () => ({
    store: redisStore,
    host: process.env.CACHE_HOST,
    port: process.env.CACHE_PORT,
    ttl: 60*60,
  }),
});

@Module({
  imports: [cacheModule],
  providers:[RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}