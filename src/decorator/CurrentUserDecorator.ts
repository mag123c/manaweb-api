import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import CurrentUser from 'src/auth/dto/currentUser.dto';

export const Jwt = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const currentUser = new CurrentUser();
  if (request.user) {
    currentUser.no = Number(request.user.no);
    currentUser.id = request.user.id;
    return currentUser;
  }
  return null;
});
