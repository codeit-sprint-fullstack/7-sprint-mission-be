import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Product from "./models/Product.js";
import cors from "cors";

const corsOptions = {
  origin: ["http://127.0.0.1:3000"],
};

dotenv.config();
const app = express();

app.use(cors()); // corsOptions 넣어도 됨
app.use(express.json());

//MongoDB 연결
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB 연결 완료"))
  .catch((err) => console.error(err));

//상품 등록 API (POST /products)
app.post("/products", async (req, res) => {
  try {
    const { name, description, price, tags } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ error: "name과 price는 필수입니다." });
    }

    const product = new Product({ name, description, price, tags });
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "상품 등록 실패", details: err.message });
  }
});

// 상품 상세 조회 API (GET /products/:id)
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select(
      "id name description price tags createdAt"
    );

    if (!product) {
      return res.status(404).json({ error: "상품을 찾을 수 없습니다." });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "상품 조회 실패", details: err.message });
  }
});

// 상품 수정 API (PATCH /products/:id)
app.patch("/products/:id", async (req, res) => {
  try {
    const updateFields = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "상품을 찾을 수 없습니다." });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "상품 수정 실패", details: err.message });
  }
});

// 상품 삭제 API (DELETE /products/:id)
app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "상품을 찾을 수 없습니다." });
    }

    res.json({ message: "상품이 삭제되었습니다." });
  } catch (err) {
    res.status(500).json({ error: "상품 삭제 실패", details: err.message });
  }
});

// 상품 목록 조회 API (GET /products)
app.get("/products", async (req, res) => {
  try {
    const { offset = 0, limit = 10, sort = "recent", search = "" } = req.query;

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };

    const sortOption = sort === "recent" ? { createdAt: -1 } : {};

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(Number(offset))
      .limit(Number(limit))
      .select("id name price createdAt");

    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ error: "상품 목록 조회 실패", details: err.message });
  }
});

// ✅ 서버 실행
app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
