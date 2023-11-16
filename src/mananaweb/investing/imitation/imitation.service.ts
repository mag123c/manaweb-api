
import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class ImitationService {
    constructor(){}

    async test(turn: number) {
        const randomDate = await this.randomDate();
        const howManyGetData = 100 + (+turn);
        const url = `https://api.upbit.com/v1/candles/minutes/240?market=KRW-BTC&to=${randomDate}&count=${howManyGetData}`;
        
        try {
            const response = await axios.get(url, { headers: { 'Accept-Encoding': 'gzip' } });
            return response.data.reverse(); // Return data directly, no need to stringify
        } catch (error) {
            // Handle the error here
            console.error("Error in ImitationService:", error);
            throw error; // Rethrow the error if needed
        }
    }

    //api에는 2017.09.26부터 데이터 있음(UTC)
    async randomDate() {
        const startDate = new Date('2017-09-26').getTime();
        const endDate = new Date().getTime();
    
        const randomDate = new Date(startDate + Math.random() * (endDate - startDate));
        const formattedDate = randomDate.toISOString().split('T')[0] + 'T00:00:00Z';
    
        return formattedDate;
    }
    
}
