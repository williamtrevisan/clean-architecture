import { Router } from "express";

const productsRoutes = Router();

const createProductController = new CreateProductController();
const listProductController = new ListProductController();

productsRoutes.post("/", createProductController.handle);
productsRoutes.get("/", listProductController.handle);

export { productsRoutes };
