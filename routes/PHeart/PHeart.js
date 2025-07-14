import express from "express";
import { postPHeart, patchPHeart } from "../../controllers/PHeart/PHeart.js";

const router = express.Router();

router.post("/", postPHeart);
router.patch("/:id", patchPHeart);

export default router;
