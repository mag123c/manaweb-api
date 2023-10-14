import { ApiProperty } from "@nestjs/swagger";

export class MilitaryResponse {

    @ApiProperty({ description: '남은일자' })
    remainDay: string;
    
    constructor(remainDay: string) {
        this.remainDay = remainDay
    }
}