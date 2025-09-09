// interface/http/routers/auth.routes.ts
import { Router } from "express";
import { RegisterUserUseCase } from "../../application/auth/registerUser";
import { AuthController } from "../controllers/authController";
import { CreateLocalUserBodyDto } from "../dto/auth/CreateUserBodyDto";
import { validateBody } from "../utils/validate";
import { PrismaService } from "../../infra/prisma/prismaClient";
import { UserRepositoryPrisma } from "../../infra/prisma/Repository/userRepository";
import { BcryptPasswordHasher } from "../../infra/security/bcrypt.hasher";

import { PrismaTransactionRunner } from "../../infra/prisma/transaction-runner";

export const makeAuthRoutes = () => {
  // 1. infra 준비
  const prisma = new PrismaService();
  const txRunner = new PrismaTransactionRunner(prisma);
  const hasher = new BcryptPasswordHasher(12);

  // 2. usecase + controller
  const usecase = new RegisterUserUseCase(txRunner, hasher);
  const ctl = new AuthController(usecase);

  // 3. 라우터에 매핑
  const r = Router();
  r.post("/signup", validateBody(CreateLocalUserBodyDto), ctl.signup);

  return r;
};
