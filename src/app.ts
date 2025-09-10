import express from "express";
import { makeAuthRoutes } from "./interface/routers/authRouter";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.use("/auth", makeAuthRoutes());

// (권장) 공통 에러 핸들러: HTML 대신 JSON으로 에러 응답
app.use((err: any, _req: any, res: any, _next: any) => {
  const status = err.status ?? err.statusCode ?? 500;
  res.status(status).json({
    success: false,
    code: err.code ?? "INTERNAL_ERROR",
    message: status === 500 ? "Internal server error" : err.message,
    // detail: err.stack, // 개발 중에만
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
