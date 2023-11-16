import { ApiProperty } from "@nestjs/swagger";

export class ImitationResponse {

    @ApiProperty({ description: 'market' })
    market: string;

    @ApiProperty({ description: 'candle_date_time_utc' })
    candle_date_time_utc: Date;

    @ApiProperty({ description: 'candle_date_time_kst' })
    candle_date_time_kst: Date;
    
    @ApiProperty({ description: 'opening_price' })
    opening_price: number;

    @ApiProperty({ description: 'high_price' })
    high_price: number;

    @ApiProperty({ description: 'low_price' })
    low_price: number;

    @ApiProperty({ description: 'trade_price' })
    trade_price: number;

    @ApiProperty({ description: 'timestamp' })
    timestamp: number;

    @ApiProperty({ description: 'candle_acc_trade_price' })
    candle_acc_trade_price: number;

    @ApiProperty({ description: 'candle_acc_trade_volume' })
    candle_acc_trade_volume: number;

    @ApiProperty({ description: 'unit' })
    unit: number;
}