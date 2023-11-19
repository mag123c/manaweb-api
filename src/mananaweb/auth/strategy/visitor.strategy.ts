import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VisitorStrategy extends PassportStrategy(Strategy, 'visitor') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['HS256'],
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  /**
   * @param payload => jwt payload
   */
  async validate(payload: any) {
    return { ...payload };
  }
}
