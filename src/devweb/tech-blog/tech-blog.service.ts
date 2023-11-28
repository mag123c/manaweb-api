import { Injectable } from '@nestjs/common';
import { promisify } from 'util';


@Injectable()
export class TechBlogService {
    ogs: any;
    ogsAsync: any;
    constructor() {
        this.ogs = require('open-graph-scraper');
        this.ogsAsync = promisify(this.ogs);
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
        const selectedLinkOgData = await this.getOgData(link);
        // const blogCrawled = await this.crawlByName(link);
        // const crawledOgData = await this.getOgData(blogCrawled);

        console.log('test', selectedLinkOgData);
        return selectedLinkOgData;
    }

    async crawlByName(name: string) {

    }

    async getOgData(url: any) {
        const options = { url: url, timeout: 4000 };

        try {
            const data = await this.ogs(options);
            const { error, html, result, response } = data;
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
        }
    }
}
