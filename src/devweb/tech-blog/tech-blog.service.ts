import { Injectable } from '@nestjs/common';

@Injectable()
export class TechBlogService {
    og: any;
    constructor() {
        this.og = require('open-graph');
    }
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
    async getDataByName(link: string) {
        const blogCrawled = await this.crawlByName(link);
        const ogData = await this.getOgData(blogCrawled);

        return ogData;
    }

    async crawlByName(name: string) {
        
    }
    async getOgData(blogCrawled: any) {
        
    }    
}
