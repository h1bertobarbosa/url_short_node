import { BAD_REQUEST } from '@src/utils/constants.util';

export default class AppErrorException {
  public readonly message: string;

  public readonly status: number;

  constructor(message: string, statusCode = BAD_REQUEST) {
    this.message = message;
    this.status = statusCode;
  }
}
