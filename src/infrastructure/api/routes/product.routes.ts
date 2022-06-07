import { Router } from "express";

const productsRoutes = Router();

const listProductController = new ListProductController();

productsRoutes.get("/", listProductController.handle);

export { productsRoutes };
