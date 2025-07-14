import express from "express";
import { postAHeart, patchAHeart } from "../../controllers/AHeart/AHeart.js";

const router = express.Router();

router.post("/", postAHeart);
router.patch("/:id", patchAHeart);

export default router;
