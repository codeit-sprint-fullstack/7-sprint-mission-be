import { patchAHeart } from "../../repositories/aHeart/aHeart.js";

export const updateAHeart = async (id, data) => {
  return await patchAHeart(id, data);
};
