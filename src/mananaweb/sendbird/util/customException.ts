import { HttpException, HttpStatus } from '@nestjs/common';

export class SendbirdBadRequestException extends HttpException {
  constructor(message: string, code: number) {
    super({ error: true, code: code, message: message }, HttpStatus.BAD_REQUEST);
  }
}