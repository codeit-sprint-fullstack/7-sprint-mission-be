import { createAHeart, updateAHeart } from "../../services/aHeart/aHeart.js";

export const postAHeart = async (req, res) => {
  const data = req.body;
  try {
    const hearts = await createAHeart(data);
    if (!hearts) {
      return res.status(404).json({ error: "Articles not found" });
    }
    res.status(200).json(hearts);
  } catch (error) {
    console.error("❌ [postAHeart] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const patchAHeart = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const hearts = await updateAHeart(id, data);
    if (!hearts) {
      return res.status(404).json({ error: "Hearts not found" });
    }
    res.status(200).json(hearts);
  } catch (error) {
    console.error("❌ [patchAHeart] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
