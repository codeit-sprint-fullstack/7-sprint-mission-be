import { postAHeart, patchAHeart } from "../../repositories/aHeart/aHeart.js";

export const createAHeart = async (data) => {
  return await postAHeart(data);
};

export const updateAHeart = async (id, data) => {
  return await patchAHeart(id, data);
};
