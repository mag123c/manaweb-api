import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class VisitorGuard extends AuthGuard('visitor') {
  handleRequest(err, user, info, context, status) {
    if (err || !user) {
      user = null;
    }
    return user;
  }
}