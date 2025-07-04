import express from "express";
import {
  getAllPComments,
  postPComment,
  patchPComment,
  deletePComment,
} from "../../controllers/pComment/pComment.js";

const router = express.Router();

router.get("/:productId", getAllPComments);
router.post("/:productId", postPComment);
router.patch("/:productId", patchPComment);
router.delete("/:productId.:id", deletePComment);

export default router;
