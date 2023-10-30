import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class SendbirdCreateUserDto {
  @ApiProperty({ description: '아이디', example: 'test1' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: '닉네임', example: 'test1' })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({ description: '프로필URL', example: null })
  @IsString()
  @IsUrl()
  profileURL: string;
}