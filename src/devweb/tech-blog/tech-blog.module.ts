import { Module } from '@nestjs/common';
import { TechBlogService } from './tech-blog.service';
import { TechBlogController } from './tech-blog.controller';

@Module({
  providers: [TechBlogService],
  controllers: [TechBlogController]
})
export class TechBlogModule {}
