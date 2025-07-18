import {
  getAllArticles,
  getArticleById,
  postArticle,
  patchArticle,
  deleteArticle,
} from "../../repositories/article/article.js";

export const fetchAllArticles = async (query) => {
  return await getAllArticles(query);
};

export const fetchArticleById = async (id, userId) => {
  return await getArticleById(id, userId);
};

export const createArticle = async (data) => {
  return await postArticle(data);
};

export const updateArticle = async (id, data) => {
  return await patchArticle(id, data);
};

export const deleteArticleService = async (id) => {
  return await deleteArticle(id);
};
