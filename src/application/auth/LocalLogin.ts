import { UserRepository } from "../../domain/ports/userRepository";
import { PasswordHasher } from "../../domain/ports/password-hasher";
import { UnprocessableEntityException } from "../../exceptions/UnporcessableEntityException";
import { ExceptionMessage } from "../../constant/ExceptionMessage";
import { TokenManager } from "../../domain/ports/token-manager";
export class LocalLogin {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: PasswordHasher,
    private readonly tokenManager: TokenManager
  ) {}

  async exec(input: { email: string; password: string }) {
    const email = input.email.trim().toLowerCase();

    const user = await this.users.findByEmail(email);
    if (!user || !user.hashedpassword) {
      throw new UnprocessableEntityException(ExceptionMessage.USER_NOT_FOUND);
    }

    const ok = await this.hasher.verify(input.password, user.hashedpassword);
    if (!ok) {
      throw new UnprocessableEntityException(
        ExceptionMessage.CURRENT_PASSWORD_NOT_MATCH
      );
    }

    const accessToken = this.tokenManager.signAccessToken({
      id: user.id,
      nickname: user.nickname,
    });
    const refreshToken = this.tokenManager.signRefreshToken({
      id: user.id,
      nickname: user.nickname,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      },
    };
  }
}
