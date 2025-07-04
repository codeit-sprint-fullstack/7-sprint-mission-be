import {
  getAllAComments,
  postAComment,
  patchAComment,
  deleteAComment,
} from "../../repositories/aComment/aComment.js";

export const fetchAllAComments = async (articleId, cursor) => {
  return await getAllAComments(articleId, cursor);
};

export const createAComment = async (articleId, data) => {
  return await postAComment(articleId, data);
};

export const updateAComment = async (articleId, id, data) => {
  return await patchAComment(articleId, id, data);
};

export const deleteACommentService = async (articleId, id) => {
  return await deleteAComment(articleId, id);
};
