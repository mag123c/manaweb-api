import { Inject, Injectable } from '@nestjs/common';
import { MAP_PROVIDER } from './map.provider';
import axios from 'axios';

@Injectable()
export class MapService {

    REQ_HEADER: any;

    constructor
    (
        @Inject(MAP_PROVIDER)
        private mapProvider: { CLIENT_ID: string, CLIENT_SECRET: string, API_URL: string }
    )
    {
        this.REQ_HEADER = {
            'X-Naver-Client-Id': mapProvider.CLIENT_ID,
            'X-Naver-Client-Secret': mapProvider.CLIENT_SECRET,
        }
    }

    //API 사용해봤더니 최대 5건밖에 조회가 안되서 그냥 크롤링 해야 할듯?
    async getQueryData(query: string) {
        const encodeQuery = encodeURI(query);
        const URL = `https://openapi.naver.com/v1/search/local.json?query=${encodeQuery}&display=5&start=1&sort=random`;
        
        try {
            const res = await axios.get(URL, { headers: this.REQ_HEADER });
            console.log(res.data);
        }
        catch (error) {
            console.error(error);
        }

    }
}
