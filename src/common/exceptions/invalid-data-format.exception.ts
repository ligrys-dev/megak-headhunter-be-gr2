import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidDataFormatException extends HttpException {
  constructor() {
    super('Invalid data format', HttpStatus.BAD_REQUEST);
  }
}
