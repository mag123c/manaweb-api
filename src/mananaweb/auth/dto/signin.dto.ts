import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSigninDto {
  @ApiProperty({ description: 'id' })
  @IsNotEmpty({ message: 'ID는 필수요소입니다.' })
  @IsString()
  id: string;
  @ApiProperty({ description: 'pw' })
  @IsNotEmpty({ message: 'PASSWORD는 필수요소입니다.' })
  pw: string;
}