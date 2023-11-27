import { ApiProperty } from "@nestjs/swagger";

export default class CurrentUser {
  @ApiProperty({ description: 'no' })
  no: number;
  @ApiProperty({ description: 'id' })
  id: string;
  @ApiProperty({ description: 'user_no' })
  user_no: number;
  @ApiProperty({ description: 'web_id' })
  web_id: string;
  @ApiProperty({ description: 'with_id', nullable: true })
  with_id?: string;
  @ApiProperty({ description: 'device_token', nullable: true })
  device_token?: string;
  @ApiProperty({ description: 'device_uuid', nullable: true })
  device_uuid?: string;
}
