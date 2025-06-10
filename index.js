const express = require("express");
const app = express();
const cors = reqire("cors");
const PORT = 5000;

app.use(
  cors({
    origin: "*",
    credential: true,
  })
);

app.post("/api/products", async (req, res) => {
  try {
    const { name, description, price, tags } = req.body;
    if (!name || !description || !price || !tags) {
      return res.status(400).json({ error: "모든 필드에 입력해주세요." });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseInt(price),
        tags,
      },
    });
    return res.status(201).json(product);
  } catch (error) {
    console.log("post요청 실패", error);
    return res.status(500).json({ error: "서버오류발생" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        createdAt: true,
      },
    });
    if (!product) {
      return res.status(404).json({ error: "해당 상품을 찾을 수 없습니다. " });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: " 서버 오류 발생" });
  }
});

app.patch("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fields = ["name", "description", "price", "tags"];
    const fieldsData = {};

    for (const otherField of fields) {
      if (req.body[otherField] !== undefined) {
        fieldsData[otherField] =
          otherField === "price"
            ? parseInt(req.body[otherField])
            : req.body[otherField];
      }
    }

    if (Object.keys(filedsData).length == 0) {
      return res.status(400).json({ error: "수정할 내용이 없습니다." });
    }
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: fieldsData,
    });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ error: "서버 오류 발생 " });
  }
});

app.delete("/api/products/", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id },
    });

    return res.status(200).json({ message: "상품이 삭제되었습니다. " });
  } catch (error) {
    return res.status(500).json({ error: "서버 오류 발생" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { offset = 0, limit = 10, sort = "recent", search = "" } = req.query;

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { cotain: search, mode: "insensitive" } },
          { description: { cotain: search, mode: "insensitive" } },
        ],
      },
      orderBy: sort === "recent" ? { createAt: "desc" } : "",
      skip: Number(offset),
      task: Number(limit),
      select: {
        id: true,
        name: true,
        price: true,
        createAt: true,
      },
    });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: "서버 오류 발생" });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
