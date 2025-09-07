export class HttpException extends Error {
  status: number;
  name: string;

  constructor(param: { status: number; name: string; message: string }) {
    const { status, name, message } = param;
    super(message);
    this.status = status;
    this.name = name;
  }
}
