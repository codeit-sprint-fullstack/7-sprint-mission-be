import { TransactionRunner } from "../../domain/ports/transaction";
import { PasswordHasher } from "../../domain/ports/password-hasher";
import { UnprocessableEntityException } from "../../exceptions/UnporcessableEntityException";
import { ExceptionMessage } from "../../constant/ExceptionMessage";

export class RegisterUserUseCase {
  constructor(
    private readonly tx: TransactionRunner,
    private readonly hasher: PasswordHasher
  ) {}

  async exec(input: {
    email: string;
    password: string;
    nickname: string;
    image?: string | null;
  }) {
    const email = input.email.trim().toLowerCase();

    return this.tx.runInTransaction(async (uow) => {
      const exists = await uow.users.findByEmail(email);
      if (exists) {
        throw new UnprocessableEntityException(
          ExceptionMessage.ALREADY_REGISTERED_EMAIL
        );
      }

      const hashedpassword = await this.hasher.hash(input.password);

      const user = await uow.users.create({
        email,
        hashedpassword,
        nickname: input.nickname,
        image: input.image ?? null,
      });

      return { id: user.id, email: user.email, createdAt: user.createdAt };
    });
  }
}
