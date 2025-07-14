//src/controllers/auth.controller.js
import {
  signIn,
  issueNewAccessToken,
  getUserFromToken,
} from "../services/auth.service.js";

export async function postSignIn(req, res, next) {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await signIn(email, password);

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 1000 * 60 * 30,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .json({ user });
  } catch (err) {
    next(err);
  }
}

export async function postRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "refreshToken이 필요합니다." });
    }

    const accessToken = issueNewAccessToken(refreshToken);
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 1000 * 60 * 30,
      })
      .json({ message: "accessToken 재발급 완료" });
  } catch (err) {
    next(err);
  }
}

export async function getMe(req, res, next) {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "토큰 없음" });

    const user = await getUserFromToken(token);
    if (!user) return res.status(404).json({ message: "사용자 없음" });

    const { password, ...userInfo } = user;
    res.json({ user: userInfo });
  } catch (err) {
    res.status(401).json({ message: "인증 실패" });
  }
}

//로그아웃은 db접근이 필요없이 그냥 쿠키만 비우면됨
export function postLogout(req, res) {
  res
    .clearCookie("accessToken", { path: "/" })
    .clearCookie("refreshToken", { path: "/" })
    .json({ message: "로그아웃 완료" });
}
