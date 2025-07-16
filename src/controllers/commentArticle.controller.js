//src/controllers/commentArticle.controller.js
import {
  createComment,
  fetchCommentsByArticleId,
} from "../services/commentArticle.service.js";

export async function getComments(req, res, next) {
  const { articleId } = req.params;
  try {
    const comments = await fetchCommentsByArticleId(Number(articleId));
    res.json({ comments });
  } catch (err) {
    next(err);
  }
}

export async function postComment(req, res, next) {
  const { articleId } = req.params;
  const { content } = req.body;
  const userId = req.user?.id;
  console.log("POST 댓글 요청", { articleId, content, userId });
  if (!userId) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  if (!content || !content.trim()) {
    return res.status(400).json({ message: "댓글 내용이 없습니다." });
  }
  try {
    const comment = await createComment({
      articleId: Number(articleId),
      userId,
      content,
    });
    res.status(201).json({ comment });
  } catch (err) {
    console.error("❌ 댓글 생성 실패:", err.message);
    next(err);
  }
}
