const express = require("express");
const router = express.Router();
const {
  getProductComments,
  patchComment,
  deleteComment,
  getArticleComments,
  createComment,
} = require("../controllers/commentController");

router.post("/", createComment);
router.patch("/:id", patchComment);
router.delete("/:id", deleteComment);
router.get("/article/:articleId", getArticleComments);
router.get("/product/:productId", getProductComments);

module.exports = router;
