import jwt from "jsonwebtoken";
import { TokenManager } from "../../domain/ports/token-manager";

export class JwtTokenManager implements TokenManager {
  constructor(
    private readonly accessSecret: string,
    private readonly refreshSecret: string
  ) {}

  signAccessToken(payload: { id: string; nickname: string }): string {
    return jwt.sign(payload, this.accessSecret, { expiresIn: "15m" });
  }

  signRefreshToken(payload: { id: string; nickname: string }): string {
    return jwt.sign(payload, this.refreshSecret, { expiresIn: "7d" });
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, this.accessSecret) as any;
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(token, this.refreshSecret) as any;
  }
}
