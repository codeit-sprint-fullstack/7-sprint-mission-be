import express from "express";
import productRouter from "./routes/product/product.js";
import articleRouter from "./routes/article/article.js";

const app = express();

app.use(express.json());

// 라우터 등록
app.use("/product", productRouter);

app.use("/article", articleRouter);

// 서버 실행
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT}에서 실행 중...🚀`);
});
