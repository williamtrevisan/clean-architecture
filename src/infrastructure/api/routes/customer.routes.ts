import { Router } from "express";

import { CreateCustomerController } from "../controller/customer/create.customer.controller";

const customersRoutes = Router();

const createCustomerController = new CreateCustomerController();

customersRoutes.post("/", createCustomerController.handle);

export { customersRoutes };
