import {
  fetchAllPComments,
  createPComment,
  updatePComment,
  deletePCommentService,
} from "../../services/pComment/pComment.js";

export const getAllPComments = async (req, res) => {
  const productId = req.params.productId;
  const { cursor } = req.query;
  try {
    const pComments = await fetchAllPComments(productId, cursor);
    if (!pComments) {
      return res.status(404).json({ error: "PComments not found" });
    }
    res.status(200).json(pComments);
  } catch (error) {
    console.error("❌ [getAllPComments] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postPComment = async (req, res) => {
  const productId = req.params.productId;
  const data = req.body;
  try {
    const pComments = await createPComment(productId, data);
    if (!pComments) {
      return res.status(404).json({ error: "PComments not found" });
    }
    res.status(200).json(pComments);
  } catch (error) {
    console.error("❌ [postPComment] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const patchPComment = async (req, res) => {
  const productId = req.params.productId;
  const { id, data } = req.body;
  try {
    const pComments = await updatePComment(productId, id, data);
    if (!pComments) {
      return res.status(404).json({ error: "PComments not found" });
    }
    res.status(200).json(pComments);
  } catch (error) {
    console.error("❌ [patchPComment] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePComment = async (req, res) => {
  const productId = req.params.productId;
  const id = req.params.id;
  try {
    const pComments = await deletePCommentService(productId, id);
    if (!pComments) {
      return res.status(404).json({ error: "PComments not found" });
    }
    res.status(200).json(pComments);
  } catch (error) {
    console.error("❌ [deletePComment] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
