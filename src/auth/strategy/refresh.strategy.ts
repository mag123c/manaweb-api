import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: any) => {
        return request?.cookies?.Refresh;
      }]),
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }
 
  async validate(request: any, payload: any) {
    const refreshToken = request.cookies?.Refresh;
    console.log(payload);
    return this.userService.refreshTokenMatches(refreshToken, payload.userId);
  }
}