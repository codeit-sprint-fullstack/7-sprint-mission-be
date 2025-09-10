// domain/entities/user.entity.ts
export type Provider = "local" | "google" | "kakao" | "naver";

export type User = {
  id: string;
  email: string;
  hashedpassword: string | null; // ← Prisma와 일치
  nickname: string;
  image: string | null;
  provider: Provider;
  providerId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// 생성용(쓰기) 모델: 로컬 vs 소셜 분리
export type CreateUserLocalInput = {
  email: string;
  hashedpassword: string; // 로컬은 반드시 해시 필요
  nickname: string;
  image?: string | null;
};

export type CreateUserSocialInput = {
  email: string;
  nickname: string;
  image?: string | null;
  provider: Exclude<Provider, "local">;
  providerId: string; // 소셜은 providerId 필수
};

export type CreateUserInput = CreateUserLocalInput | CreateUserSocialInput;
