const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credential: true,
  })
);

const productRoutes = require("./routes/products");
const articleRoutes = require("./routes/articles");
const commentRoutes = require("./routes/comment");

app.use("/api/products", productRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/comment", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
