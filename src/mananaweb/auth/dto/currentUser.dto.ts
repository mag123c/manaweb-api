import { ApiProperty } from "@nestjs/swagger";

export default class CurrentUser {
  @ApiProperty({ description: 'no' })
  no: number;
  @ApiProperty({ description: 'id' })
  id: string;
  @ApiProperty({ description: 'user_no' })
  userNo: number;
  @ApiProperty({ description: 'web_id' })
  webId: string;
  @ApiProperty({ description: 'with_id', nullable: true })
  withId?: string;
}
