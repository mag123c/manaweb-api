import { Test, TestingModule } from '@nestjs/testing';
import { TechBlogService } from './tech-blog.service';

describe('TechBlogService', () => {
  let service: TechBlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechBlogService],
    }).compile();

    service = module.get<TechBlogService>(TechBlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
