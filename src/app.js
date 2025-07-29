// src/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import articleRoutes from "./routes/article.routes.js";
import authRoutes from "./routes/auth.routes.js";
import commentArticleRoutes from "./routes/commentArticle.routes.js";
import cookieParser from "cookie-parser";

const app = express();

// 🔧 미들웨어
app.use(
  cors({
    origin: "http://localhost:3000", // 프론트 도메인 정확히 명시
    credentials: true, // 쿠키 주고받기 허용
  })
);
//경로 안적으면 전체에 적용
app.use(express.json()); // JSON 파싱
app.use(cookieParser()); //res.cookie() 쓰기위함
app.use(morgan("dev")); // 요청 로깅

// ✅ 라우트 연결
app.use("/articles", articleRoutes); // /articles, /articles/:id
app.use("/articles", commentArticleRoutes); // /articles/:id/comments
app.use("/auth", authRoutes);

// 🛠 에러 핸들링 미들웨어 (선택)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "서버 오류 발생" });
});

export default app;
