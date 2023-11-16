import { ApiProperty } from "@nestjs/swagger";

export class CPResponse {

    @ApiProperty({ description: 'tmp' })
    tmp: string;

    @ApiProperty({ description: 'revenue' })
    revenue: number;

    @ApiProperty({ description: 'currentPrice' })
    currentPrice: number;
    
    @ApiProperty({ description: 'totalPercent' })
    totalPercent: string;

    constructor(tmp: string, revenue: number, currentPrice: number, totalPercent: string) {
        this.tmp = tmp;
        this.revenue = revenue;
        this.currentPrice = currentPrice;
        this.totalPercent = totalPercent;
    }
}