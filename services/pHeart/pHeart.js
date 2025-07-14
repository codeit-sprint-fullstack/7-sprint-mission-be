import { patchPHeart } from "../../repositories/pHeart/pHeart.js";

export const updatePHeart = async (id, data) => {
  return await patchPHeart(id, data);
};
