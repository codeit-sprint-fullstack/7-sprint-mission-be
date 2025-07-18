import { createPHeart, updatePHeart } from "../../services/pHeart/pHeart.js";

export const postPHeart = async (req, res) => {
  const data = req.body;
  try {
    const hearts = await createPHeart(data);
    if (!hearts) {
      return res.status(404).json({ error: "Articles not found" });
    }
    res.status(200).json(hearts);
  } catch (error) {
    console.error("❌ [postPHeart] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const patchPHeart = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const hearts = await updatePHeart(id, data);
    if (!hearts) {
      return res.status(404).json({ error: "Hearts not found" });
    }
    res.status(200).json(hearts);
  } catch (error) {
    console.error("❌ [patchPHeart] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
