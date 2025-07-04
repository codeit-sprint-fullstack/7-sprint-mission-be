import {
  getAllPComments,
  postPComment,
  patchPComment,
  deletePComment,
} from "../../repositories/pComment/pComment.js";

export const fetchAllPComments = async (productId, cursor) => {
  return await getAllPComments(productId, cursor);
};

export const createPComment = async (productId, data) => {
  return await postPComment(productId, data);
};

export const updatePComment = async (productId, id, data) => {
  return await patchPComment(productId, id, data);
};

export const deletePCommentService = async (productId, id) => {
  return await deletePComment(productId, id);
};
