import { Router } from "express";

import { CreateProductController } from "../controller/product/create/create.product.controller";
import { ListProductController } from "../controller/product/list/list.product.controller";

const productsRoutes = Router();

const createProductController = new CreateProductController();
const listProductController = new ListProductController();

productsRoutes.post("/", createProductController.handle);
productsRoutes.get("/", listProductController.handle);

export { productsRoutes };
