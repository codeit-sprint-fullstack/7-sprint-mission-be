import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import { productRouter } from "./products/routes/index.js";

// Express 앱 객체 생성 (이게 서버의 본체)
const app = express();
// 모든 요청에 대해 CORS 허용
app.use(cors());
//터미널에 로그를 찍어주는 미들웨어
app.use(morgan("dev"));
// 요청 body가 JSON일 경우 파싱해서 req.body에 넣어줌
app.use(express.json());

const PORT = 3000; // 서버가 사용할 포트 번호
const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL; // .env에 저장된 MongoDB 연결 주소 가져오기
await mongoose.connect(DB_CONNECTION_URL);

app.get("/", (req, res) => {
  res.send("판다마켓 서버 연결됨");
});

app.use("/products", productRouter);

app.listen(PORT, () => {
  console.log("server start...");
});
