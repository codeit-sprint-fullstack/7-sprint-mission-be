import express from "express";
import { patchAHeart } from "../../controllers/AHeart/AHeart.js";

const router = express.Router();

router.patch("/:id", patchAHeart);

export default router;
