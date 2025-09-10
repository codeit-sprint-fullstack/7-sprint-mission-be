import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { generateToken } from "../config/jwt";
import { AuthRequest } from "../middlewares/auth.middleware";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await userService.loginUser(req.body.email, req.body.password);
    const token = generateToken(user.id);
    res.status(200).json({ message: "로그인성공", token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export const information = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "로그인 필요" });

    const user = await userService.getUserById(req.userId);
    return res.status(200).json({ name: user.name, img: user.img });
  } catch (err: any) {
    return res.status(401).json({ error: err.message });
  }
};
