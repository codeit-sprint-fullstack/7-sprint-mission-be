// interface/http/controllers/auth.controller.ts
import type { Request, Response, NextFunction } from "express";
import { RegisterUserUseCase } from "../../application/auth/registerUser";

export class AuthController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await this.registerUser.exec(req.body);
      res.status(201).json({ success: true, data: out });
    } catch (e) {
      next(e);
    }
  };
}
