// interface/http/routers/auth.routes.ts
import { Router } from "express";
import { LocalLogin } from "../../application/auth/LocalLogin";
import { RegisterUserUseCase } from "../../application/auth/registerUser";
import { EnvKeys } from "../../constant/envKeys";
import { PrismaService } from "../../infra/prisma/prismaClient";
import { UserRepositoryPrisma } from "../../infra/prisma/Repository/userRepository";
import { PrismaTransactionRunner } from "../../infra/prisma/transaction-runner";
import { BcryptPasswordHasher } from "../../infra/security/bcrypt.hasher";
import { JwtTokenManager } from "../../infra/security/jwt.token-manager";
import { AuthController } from "../controllers/authController";
import { CreateLocalUserBodyDto } from "../dto/auth/CreateUserBodyDto";
import { LoginBodyDto } from "../dto/auth/LoginBodyDto";
import { validateBody } from "../utils/validate";

export const makeAuthRoutes = () => {
  // 1. infra 준비
  const prisma = new PrismaService();
  const txRunner = new PrismaTransactionRunner(prisma);
  const userRePoPrisma = new UserRepositoryPrisma(prisma);
  const hasher = new BcryptPasswordHasher(12);
  const jwtTokenManager = new JwtTokenManager(
    process.env[EnvKeys.ACCESS_SECRET]!,
    process.env[EnvKeys.REFRESH_SECRET]!
  );

  // 2. usecase + controller
  const registerUser = new RegisterUserUseCase(txRunner, hasher);
  const localUsecase = new LocalLogin(userRePoPrisma, hasher, jwtTokenManager);
  const ctl = new AuthController(registerUser, localUsecase);

  // 3. 라우터에 매핑
  const r = Router();
  r.post("/signup", validateBody(CreateLocalUserBodyDto), ctl.signup);

  r.post("/login", validateBody(LoginBodyDto), ctl.login);

  r.post("logout", ctl.logout);
  return r;
};
