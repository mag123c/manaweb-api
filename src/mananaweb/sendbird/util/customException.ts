import { HttpException, HttpStatus } from '@nestjs/common';

export class SendbirdBadRequestException extends HttpException {
  constructor(message: string, code: number) {
    console.log(message, code)
    super({ error: true, code: code, message: message }, HttpStatus.BAD_REQUEST);
  }
}