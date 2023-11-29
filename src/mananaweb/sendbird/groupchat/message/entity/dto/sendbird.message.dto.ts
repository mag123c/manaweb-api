import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class SendbirdTextMsgDto {
  @ApiProperty({ description: '아이디', default: 'MESG' })
  @IsString()
  @IsNotEmpty()
  message_type: string;

  @ApiProperty({ description: '메세지', example: 'test1' })
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({ description: '메세지', example: '안녕하세요 반갑습니다.' })
  @IsString()
  @IsUrl()
  message: string;
}

// export class SendbirdFileMsgDto {
//     @ApiProperty({ description: '아이디', default: 'FILE' })
//     @IsString()
//     @IsNotEmpty()
//     message_type: string;
  
//     @ApiProperty({ description: '메세지', example: 'test1' })
//     @IsString()
//     @IsNotEmpty()
//     user_id: string;
  
//     @ApiProperty({ description: '메세지', example: '안녕하세요 반갑습니다.' })
//     @IsString()
//     @IsUrl()
//     message: string;
//   }

//   export class SendbirAdminMsgDto {
//     @ApiProperty({ description: '아이디', default: 'ADMM' })
//     @IsString()
//     @IsNotEmpty()
//     message_type: string;
  
//     @ApiProperty({ description: '메세지', example: 'test1' })
//     @IsString()
//     @IsNotEmpty()
//     user_id: string;
  
//     @ApiProperty({ description: '메세지', example: '안녕하세요 반갑습니다.' })
//     @IsString()
//     @IsUrl()
//     message: string;
//   }