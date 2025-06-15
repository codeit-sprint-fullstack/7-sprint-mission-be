const express = require("express");
const {
  createArticle,
  getArticle,
  deleteArticle,
  getArticleList,
} = require("../controllers/articleController");
const router = express.Router();

router.post("/", createArticle);
router.get("/", getArticle);
router.patch("/:id", patchArticle);
router.delete("/:id", deleteArticle);
router.get("/:id", getArticleList);

module.exports = router;
