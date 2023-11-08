import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class UserInvestmentDataPutDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'startPrice' })
    startPrice: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'endtPrice' })
    endPrice: string;
    
    @IsString()
    @ApiProperty({ description: 'memo' })
    memo: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'yyyymm' })
    yyyymm: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'day' })
    day: string;
}
