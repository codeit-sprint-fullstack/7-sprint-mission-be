import {
  fetchAllArticles,
  fetchArticleById,
  createArticle,
  updateArticle,
  deleteArticleService,
} from "../../services/article/article.js";

export const getAllArticles = async (req, res) => {
  const { query } = req;
  try {
    const articles = await fetchAllArticles(query);
    if (!articles) {
      return res.status(404).json({ error: "Articles not found" });
    }
    res.status(200).json(articles);
  } catch (error) {
    console.error("❌ [getAllArticles] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getArticleById = async (req, res) => {
  const id = req.params.id;
  const userId = req.query.userId;
  try {
    const articles = await fetchArticleById(id, userId);
    if (!articles) {
      return res.status(404).json({ error: "Articles not found" });
    }
    res.status(200).json(articles);
  } catch (error) {
    console.error("❌ [getArticleById] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postArticle = async (req, res) => {
  const { data } = req.body;
  try {
    const articles = await createArticle(data);
    if (!articles) {
      return res.status(404).json({ error: "Articles not found" });
    }
    res.status(200).json(articles);
  } catch (error) {
    console.error("❌ [postArticle] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const patchArticle = async (req, res) => {
  const { id, data } = req.body;
  try {
    const articles = await updateArticle(id, data);
    if (!articles) {
      return res.status(404).json({ error: "Articles not found" });
    }
    res.status(200).json(articles);
  } catch (error) {
    console.error("❌ [patchArticle] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteArticle = async (req, res) => {
  const id = req.query.id;
  try {
    const articles = await deleteArticleService(id);
    if (!articles) {
      return res.status(404).json({ error: "Articles not found" });
    }
    res.status(200).json(articles);
  } catch (error) {
    console.error("❌ [deleteArticle] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
