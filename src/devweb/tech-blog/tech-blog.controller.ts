import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TechBlogService } from './tech-blog.service';
import { TechBlogLinks, TechBlogNameEnum } from './enum/tech-blog.enum';
import { QueryNFException } from '../exception/customexception';

@Controller('dev/tech-blog')
@ApiTags('테크기업 블로그 크롤링')
export class TechBlogController {
    constructor(
        private techBlogService: TechBlogService
    ) { }
    //OG 태그 가져와서 커스텀 DIV 만들어주기
    // 1. crawling > posting url get
    // 2. og data > get
    //  ex)
    //   const og = require('open-graph');
    //   const url = 'http://github.com/samholmes/node-open-graph/raw/master/test.html';

    //   og(url, function (err, meta) {
    //      console.log(meta);
    //   });
    // 3. return data.

    @Get()
    @ApiOperation({ description: '해당 테크 기업의 블로그 데이터 크롤링 ' })
    async getDataByName(@Query('name') name: string) {
        const enumName = TechBlogNameEnum[name as keyof typeof TechBlogNameEnum];

        if (!enumName) {
            throw new QueryNFException(name);
        }

        const link = TechBlogLinks[enumName];
        console.log(enumName, link);
        return await this.techBlogService.getDataByName(link);
    }
}
