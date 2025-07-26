//src/services/article.service.js
import {
  fetchArticleById,
  fetchArticles,
  createArticle,
  countAllArticles,
  groupCommentCounts,
  countCommentsOfArticle,
} from "../repositories/article.repository.js";

// 게시글 리스트 조회 (댓글수 포함)
export async function getArticlesService({
  page = 1,
  pageSize = 5,
  orderBy = "recent",
}) {
  const skip = (page - 1) * pageSize;
  const take = Number(pageSize);
  const sortOrder =
    orderBy === "like" ? { likeCount: "desc" } : { updatedAt: "desc" };

  const [articles, commentGroups, totalCount] = await Promise.all([
    fetchArticles({ skip, take, orderBy: sortOrder }),
    groupCommentCounts(),
    countAllArticles(),
  ]);

  const commentMap = Object.fromEntries(
    commentGroups.map((item) => [item.articleId, item._count.articleId])
  );
  const articlesWithCommentCount = articles.map((article) => ({
    ...article,
    commentCount: commentMap[article.id] || 0,
  }));

  return { list: articlesWithCommentCount, totalCount };
}

//게시글 상세 조회
export async function getArticleDetail(articleId) {
  const [article, commentCount] = await Promise.all([
    fetchArticleById(articleId),
    countCommentsOfArticle(articleId),
  ]);

  if (!article) {
    const error = new Error(
      `articleId : ${articleId} 의 article은 존재하지 않습니다`
    );
    error.status = 404;
    throw error;
  }

  return { ...article, commentCount };
}

//글작성
export async function handleCreateArticle(data) {
  //@TODO title content 유효성 검사 등 business logic
  return await createArticle(data);
}
