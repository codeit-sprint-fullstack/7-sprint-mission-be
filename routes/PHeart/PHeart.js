import express from "express";
import { patchPHeart } from "../../controllers/PHeart/PHeart.js";

const router = express.Router();

router.patch("/:id", patchPHeart);

export default router;
