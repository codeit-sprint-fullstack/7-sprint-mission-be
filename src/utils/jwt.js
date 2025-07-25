// src/utils/jwt.js
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ISSUER = "sp-panda-market";

// access: 30분, refresh: 7일 토큰생성
//jwt.sign - 토큰 생성
export function createAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, {
    algorithm: "HS256",
    expiresIn: "30m",
    issuer: ISSUER,
  });
}

export function createRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_SECRET, {
    algorithm: "HS256",
    expiresIn: "7d",
    issuer: ISSUER,
  });
}

// jwt.verify 액세스 토큰 유효성 검증
export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, ACCESS_SECRET);
  } catch (err) {
    console.error("utils/jws - AccessToken 검증 실패 : ", err.message);
    return null; //검증 실패시 null 반환
  }
}

// 리프레시 토큰 검증
export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch (err) {
    console.error("utils/jws - Refresh Token 검증 실패 : ", err.message);
    return null; //검증 실패시 null 반환
  }
}
