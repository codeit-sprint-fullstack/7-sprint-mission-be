//src/controllers/commentArticle.controller.js
import {
  createComment,
  fetchCommentsByArticleId,
  updateComment,
  deleteComment as deleteCommentService,
  toggleArticleCommentLike,
} from "../services/commentArticle.service.js";

export async function getComments(req, res, next) {
  const { articleId } = req.params;
  const userId = req.user?.id; // 비로그인이면 undefined
  try {
    const comments = await fetchCommentsByArticleId(Number(articleId), userId);
    res.json({ comments });
  } catch (err) {
    next(err);
  }
}

//
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

//
export async function patchComment(req, res, next) {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  if (!content || !content.trim()) {
    return res.status(400).json({ message: "수정할 내용이 없습니다." });
  }
  try {
    const updatedComment = await updateComment({
      commentId: Number(commentId),
      userId,
      content,
    });
    if (!updatedComment) {
      return res.status(404).json({ message: "댓글을 수정할 수 없습니다." });
    }
    res.status(200).json({ comment: updatedComment });
  } catch (err) {
    console.error("❌ 댓글 수정 실패:", err.message);
    next(err);
  }
}

//
export async function deleteComment(req, res, next) {
  const { commentId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  try {
    const deleted = await deleteCommentService({
      commentId: Number(commentId),
      userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "댓글을 삭제할 수 없습니다." });
    }

    res.status(204).send(); // ✅ No Content
  } catch (err) {
    console.error("❌ 댓글 삭제 실패:", err.message);
    next(err);
  }
}

export async function toggleLikeComment(req, res, next) {
  const { commentId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }
  if (isNaN(commentId)) {
    return res.status(400).json({ message: "잘못된 댓글 ID입니다." });
  }

  try {
    const { liked, likeCount } = await toggleArticleCommentLike({
      commentId: Number(commentId),
      userId,
    });

    res.status(200).json({
      liked,
      likeCount,
      message: liked ? "추천 완료" : "추천 취소",
    });
  } catch (err) {
    console.error("❌ 댓글 추천 실패:", err.message);
    next(err);
  }
}
