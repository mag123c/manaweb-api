import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from 'src/mananaweb/user/user.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        const refreshToken = request.headers.authorization.slice(7).trim();
        return refreshToken;
      }]),
      ignoreExpiration: false,
      passReqToCallback: true,
      algorithms: ['HS256'],
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  //왜 리턴을 올바르게 했는데 다시 request객체를 받아야 하는가..?
  async validate(request: Request, payload: any) {    
    const refreshToken = request.headers.authorization.slice(7).trim();
    return this.userService.refreshTokenMatches(refreshToken, payload.no);
  }
}
