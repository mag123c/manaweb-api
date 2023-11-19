import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserLeaderBoardCreateDto {
    @IsString()
    @ApiProperty({ description: 'startPrice' })
    startPrice: string;

    @IsString()    
    @ApiProperty({ description: 'nickname' })
    nickname: string;

}