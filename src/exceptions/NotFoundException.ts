import { HttpException } from "./HttpException";

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super({
      status: 404,
      name: "NotFound",
      message,
    });
  }
}
