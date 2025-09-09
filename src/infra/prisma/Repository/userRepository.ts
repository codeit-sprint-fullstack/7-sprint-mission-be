// infra/prisma/user.repository.prisma.ts
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prismaClient";
import { UserRepository } from "../../../domain/ports/userRepository";
import {
  User,
  CreateUserInput,
  CreateUserLocalInput,
} from "../../../domain/entities/user";

type Tx = PrismaService | Prisma.TransactionClient;

export class UserRepositoryPrisma implements UserRepository {
  constructor(private readonly db: Tx) {}

  findById(id: string): Promise<User | null> {
    return (this.db as any).user.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return (this.db as any).user.findUnique({ where: { email } });
  }

  create(data: CreateUserInput): Promise<User> {
    if (isLocal(data)) {
      const { email, hashedpassword, nickname, image = null } = data;
      return (this.db as any).user.create({
        data: { email, hashedpassword, nickname, image, provider: "local" },
      });
    }
    const { email, nickname, image = null, provider, providerId } = data;
    return (this.db as any).user.create({
      data: {
        email,
        nickname,
        image,
        provider,
        providerId,
        hashedpassword: null,
      },
    });
  }
}

function isLocal(x: CreateUserInput): x is CreateUserLocalInput {
  return (x as CreateUserLocalInput).hashedpassword !== undefined;
}
