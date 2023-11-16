import { ApiProperty } from "@nestjs/swagger";

export default class ProfitAndLossDto {
    @ApiProperty({ description: 'name' })
    name: string;
    @ApiProperty({ description: 'start' })
    start: number;
    @ApiProperty({ description: 'end' })
    end: number;
}
