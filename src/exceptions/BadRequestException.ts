import { HttpException } from "./HttpException";

export class BandRequestException extends HttpException {
  constructor(message: string) {
    super({
      status: 400,
      name: "Bad Request",
      message,
    });
  }
}
