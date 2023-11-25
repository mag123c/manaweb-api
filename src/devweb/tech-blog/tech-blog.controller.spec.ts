import { Test, TestingModule } from '@nestjs/testing';
import { TechBlogController } from './tech-blog.controller';

describe('TechBlogController', () => {
  let controller: TechBlogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechBlogController],
    }).compile();

    controller = module.get<TechBlogController>(TechBlogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
