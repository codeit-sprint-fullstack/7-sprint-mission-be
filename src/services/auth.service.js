//src/services/auth.service.js
import bcrypt from "bcryptjs"; // 나중에 암호화할 경우 대비
import {
  findUserByEmail,
  findUserById,
} from "../repositories/auth.repository.js";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
} from "../utils/jwt.js";

export async function signIn(email, password) {
  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
    error.status = 401;
    throw error;
  }

  // 👉 비밀번호 검증
  const isMatch = password === user.password; // 실서비스는 bcrypt 비교 필요
  // const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
    error.status = 401;
    throw error;
  }

  const payload = { id: user.id };
  const accessToken = createAccessToken({ ...payload, scope: "access" });
  const refreshToken = createRefreshToken({ ...payload, scope: "refresh" });

  const { password: _, ...userInfo } = user;

  return {
    user: userInfo,
    accessToken,
    refreshToken,
  };
}

export function issueNewAccessToken(refreshToken) {
  try {
    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded || decoded.scope !== "refresh") {
      const err = new Error("유효하지 않은 토큰 유형입니다.");
      err.status = 401;
      throw err;
    }

    const newAccessToken = createAccessToken({
      id: decoded.id,
      scope: "access",
    });

    return {
      accessToken: newAccessToken,
    };
  } catch (err) {
    err.status = 401;
    throw err;
  }
}

export async function getUserFromToken(token) {
  const decoded = verifyAccessToken(token);
  return await findUserById(decoded.id);
}
