import { postPHeart, patchPHeart } from "../../repositories/pHeart/pHeart.js";

export const createPHeart = async (data) => {
  return await postPHeart(data);
};

export const updatePHeart = async (id, data) => {
  return await patchPHeart(id, data);
};
