import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info, context, status) {
  console.log(user)

    if (err || !user) {      
      throw new UnauthorizedException('유저를 찾을 수 없습니다.');
    }
    return user;
  }
}
