import { Router } from "express";
import ProductController from "../controller/index.js";

export const productRouter = Router();

productRouter.post("/", ProductController.create);

productRouter.get("/:id", ProductController.getProductById);
