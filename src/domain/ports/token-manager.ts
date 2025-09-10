export interface TokenManager {
  signAccessToken(payload: { id: string; nickname: string }): string;
  signRefreshToken(payload: { id: string; nickname: string }): string;
  verifyAccessToken(token: string): { id: string; nickname: string };
  verifyRefreshToken(token: string): { id: string; nickname: string };
}
