import { Router } from "express";

import { customersRoutes } from "./customer.routes";
import { productsRoutes } from "./product.routes";

const router = Router();

router.use("/customers", customersRoutes);
router.use("/products", productsRoutes);

export { router };
