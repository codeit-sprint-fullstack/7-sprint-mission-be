import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "토큰 필요" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "토큰 필요" });

  const secret = process.env.JWT_SECRET;
  if (!secret)
    return res.status(500).json({ message: "서버 환경 변수 미설정" });

  try {
    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "userId" in decoded
    ) {
      req.userId = (decoded as { userId: string }).userId;
      return next(); // ✅ return 추가
    } else {
      return res.status(401).json({ message: "토큰 유효하지 않음" });
    }
  } catch (err) {
    return res.status(401).json({ message: "토큰 유효하지 않음" });
  }
};
