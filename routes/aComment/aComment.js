import express from "express";
import {
  getAllAComments,
  postAComment,
  patchAComment,
  deleteAComment,
} from "../../controllers/aComment/aComment.js";

const router = express.Router();

router.get("/:articleId", getAllAComments);
router.post("/:articleId", postAComment);
router.patch("/:articleId", patchAComment);
router.delete("/:articleId.:id", deleteAComment);

export default router;
