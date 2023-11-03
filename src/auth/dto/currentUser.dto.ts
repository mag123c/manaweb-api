import { ApiProperty } from "@nestjs/swagger";

export default class CurrentUser {
  @ApiProperty({ description: 'no' })
  no: number;
  @ApiProperty({ description: 'id' })
  id: string;
}
