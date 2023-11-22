import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserLeaderBoardDto {
    @IsString()
    @ApiProperty({ description: 'startPrice' })
    startPrice: string;

    @IsString()    
    @ApiProperty({ description: 'nickname' })
    nickname: string;

}