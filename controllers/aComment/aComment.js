import {
  fetchAllAComments,
  createAComment,
  updateAComment,
  deleteACommentService,
} from "../../services/aComment/aComment.js";

export const getAllAComments = async (req, res) => {
  const articleId = req.params.articleId;
  const { cursor } = req.query;
  try {
    const aComments = await fetchAllAComments(articleId, cursor);
    if (!aComments) {
      return res.status(404).json({ error: "AComments not found" });
    }
    res.status(200).json(aComments);
  } catch (error) {
    console.error("❌ [getAllAComments] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postAComment = async (req, res) => {
  const articleId = req.params.articleId;
  const data = req.body;
  try {
    const aComments = await createAComment(articleId, data);
    if (!aComments) {
      return res.status(404).json({ error: "AComments not found" });
    }
    res.status(200).json(aComments);
  } catch (error) {
    console.error("❌ [postAComment] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const patchAComment = async (req, res) => {
  const articleId = req.params.articleId;
  const { id, data } = req.body;
  try {
    const aComments = await updateAComment(articleId, id, data);
    if (!aComments) {
      return res.status(404).json({ error: "AComments not found" });
    }
    res.status(200).json(aComments);
  } catch (error) {
    console.error("❌ [patchAComment] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAComment = async (req, res) => {
  const articleId = req.params.articleId;
  const id = req.params.id;
  try {
    const aComments = await deleteACommentService(articleId, id);
    if (!aComments) {
      return res.status(404).json({ error: "AComments not found" });
    }
    res.status(200).json(aComments);
  } catch (error) {
    console.error("❌ [deleteAComment] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
