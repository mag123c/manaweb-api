import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      usernameField: 'id',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }
 
  async validate(request: any, id: string) {
    const refreshToken = request.cookies?.refreshToken;
    const refreshToken2 = request.get('Authrization').replace('Bearer', '').trim();
    console.log('refreshjwt', refreshToken, refreshToken2);
    return this.userService.refreshTokenMatches(refreshToken, id);
  }
}