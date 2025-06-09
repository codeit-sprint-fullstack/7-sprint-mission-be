import { Router } from "express";
import ProductController from "../controller/index.js";

export const productRouter = Router();

productRouter.post("/", ProductController.create);

productRouter.get("/:id", ProductController.getProductById);

productRouter.patch("/:id", ProductController.updateProductById);

productRouter.delete("/:id", ProductController.deleteProductById);

productRouter.get("/", ProductController.getProducts);
