const express = require("express");
const router = express.Router();
const {
  createProduct,
  deleteProduct,
  patchProduct,
} = require("../controllers/productController");

router.post("/", createProduct);
router.get("/:id", getProductById);
router.get("/", getProduct);
router.delete(":id", deleteProduct);
router.patch(":id", patchProduct);

module.exports = router;
