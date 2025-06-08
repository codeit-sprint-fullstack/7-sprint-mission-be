import { Router } from "express";
import productController from "../controller/index.js";

export const productRouter = Router();

productRouter.post("/", productController.create);
