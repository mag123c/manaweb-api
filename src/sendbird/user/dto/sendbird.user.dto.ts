import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '아이디' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: '닉네임' })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({ description: '프로필URL' })
  @IsString()
  @IsUrl()
  profileURL: string;
}