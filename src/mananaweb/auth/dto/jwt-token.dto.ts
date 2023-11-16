import { ApiProperty } from "@nestjs/swagger";

export class JwtTokenDto {
  /**
   * Jwt AccessToken
   */
  @ApiProperty({ description: 'access_token' })
  access_token: string;
  /**
   * RefreshToken
   */
  @ApiProperty({ description: 'refresh_token' })
  refresh_token: string;

  constructor(access_token: string, refresh_token?: string) {
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }
}
