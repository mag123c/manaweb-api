import { Injectable } from '@nestjs/common';

@Injectable()
export class BinanceService {
    future_url: string;

    constructor(){
        this.future_url = 'https://fapi.binance.com/fapi/v1/';
    }

    async getSymbol() {
        const symbolURL = 'exchangeInfo';
    }
}
