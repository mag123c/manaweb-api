
import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class ImitationService {
    constructor(){}

    async test(turn: number) {
        const howManyGetData = 50 + (+turn);
        console.log(howManyGetData);
        const url = 'https://api.upbit.com/v1/candles/minutes/5?market=KRW-BTC&count=' + howManyGetData;
        
        try {
            const response = await axios.get(url, { headers: { 'Accept-Encoding': 'gzip' } });
            return response.data.reverse(); // Return data directly, no need to stringify
        } catch (error) {
            // Handle the error here
            console.error("Error in ImitationService:", error);
            throw error; // Rethrow the error if needed
        }
    }
}
