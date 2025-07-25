// src/middlewares/auth.js
import { func } from "superstruct";
import { verifyAccessToken } from "../utils/jwt.js";

export function requireAuth(req, res, next) {
  // console.log(typeof req.cookies.accessToken);
  // console.log(" accessToken 쿠키 값:", req.cookies?.accessToken);
  // console.log(" 전체 쿠키 객체:", req.cookies);
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

//토큰이 있으면 req.user에 유저정보 저장
// 토큰이 없거나 유효하지 않으면 에러없이 넘어감 (토큰없을때도 일단 댓글 보이게)
export function setUserIfExists(req, res, next) {
  const accessToken = req.cookies.accessToken;
  //비로그인도 일단 넘어가라
  if (!accessToken) {
    return next();
  }

  try {
    const decoded = verifyAccessToken(accessToken);
    req.user = decoded;
  } catch (err) {
    // 만료되거나 위조된 토큰이어도 next(err) 안 던지고 넘어감 
    console.warn("⚠️ 유효하지 않은 토큰:", err.message);
  }
  next();
}
