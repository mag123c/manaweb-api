
import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class ImitationService {
    constructor(){}

    async test() {
        const url = 'https://api.upbit.com/v1/candles/minutes/5?market=KRW-BTC&count=150';
        
        const data = await axios.get(url,
                { headers: { 'Accept-Encoding': 'gzip' } }
            );

        console.log(data);
        return data;
    }
}