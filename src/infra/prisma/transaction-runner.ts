import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaService } from "./prismaClient";
import { TransactionRunner, UnitOfWork } from "../../domain/ports/transaction";
import { UserRepositoryPrisma } from "./Repository/userRepository";

export class PrismaTransactionRunner implements TransactionRunner {
  constructor(private readonly prisma: PrismaService) {}

  async runInTransaction<T>(work: (uow: UnitOfWork) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const uow: UnitOfWork = {
        users: new UserRepositoryPrisma(tx),
      };
      return work(uow);
    });
  }
}
