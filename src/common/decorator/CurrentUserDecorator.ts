import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import CurrentUser from 'src/mananaweb/auth/dto/currentUser.dto';

export const Jwt = createParamDecorator((data: unknown, context: ExecutionContext) => {  
  const request = context.switchToHttp().getRequest();  
  const cookies = request?.headers?.authorization?.split('Bearer ')[1];
  const currentUser = new CurrentUser();
  if (request.user) {
    console.log(cookies);
    currentUser.no = Number(request.user.no);
    currentUser.id = request.user.id;
    return currentUser;
  }
  else if(cookies === 'iweddingAccessToken') {
    console.log('iwedding', cookies);
    currentUser.webId = '아이웨딩';
    currentUser.withId = '아이웨딩';
    return currentUser;
  }
  else {
    currentUser.webId = 'test1';
    currentUser.withId = 'iwd435990';    
    return currentUser;
  }
});
