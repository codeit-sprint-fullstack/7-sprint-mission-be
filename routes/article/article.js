import express from "express";
import {
  getAllArticles,
  getArticleById,
  postArticle,
  patchArticle,
  deleteArticle,
} from "../../controllers/article/article.js";

const router = express.Router();

router.get("/", getAllArticles);
router.get("/:id", getArticleById);
router.post("/", postArticle);
router.patch("/", patchArticle);
router.delete("/:id", deleteArticle);

export default router;
