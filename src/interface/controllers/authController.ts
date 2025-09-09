// interface/http/controllers/auth.controller.ts
import type { Request, Response, NextFunction } from "express";
import { RegisterUserUseCase } from "../../application/auth/registerUser";
import { LocalLogin } from "../../application/auth/LocalLogin";

export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly localLogin: LocalLogin
  ) {}

  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await this.registerUser.exec(req.body);
      res.status(201).json({ success: true, data: out });
    } catch (e) {
      next(e);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await this.localLogin.exec(req.body);

      res.cookie("accessToken", out.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 15, // 15분
        path: "/",
      });

      res.cookie("refreshToken", out.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: "/auth/refresh",
      });

      res.status(200).json({ success: true, data: out.user });
    } catch (e) {
      next(e);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 15, // 15분
        path: "/",
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: "/auth/refresh",
      });

      res.status(200).json({ success: true });
    } catch (e) {
      next(e);
    }
  };
}
