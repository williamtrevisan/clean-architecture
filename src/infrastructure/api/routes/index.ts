import { Router } from "express";

import { customersRoutes } from "./customer.routes";

const router = Router();

router.use("/customers", customersRoutes);

export { router };
