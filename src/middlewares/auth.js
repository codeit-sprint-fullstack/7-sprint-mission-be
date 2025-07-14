// src/middlewares/auth.js
import { verifyAccessToken } from "../utils/jwt.js";

export function requireAuth(req, res, next) {
  const accessToken = req.cookies?.accessToken;

  // 1. 토큰이 아예 없는 경우
  if (!accessToken) {
    return res.status(401).json({ message: "AccessToken이 없습니다." });
  }

  // 2. 토큰 검증
  const decoded = verifyAccessToken(accessToken);
  if (!decoded) {
    return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
  // 3. 검증 성공 시 req.user에 저장 → 이후 컨트롤러에서 사용 가능
  req.user = decoded;
  next();
}
