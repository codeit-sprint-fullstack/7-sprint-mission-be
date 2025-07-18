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
router.patch("/:id", patchArticle);
router.delete("/:id", deleteArticle);

export default router;
