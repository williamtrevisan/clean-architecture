import { Router } from "express";

import { CreateCustomerController } from "../controller/customer/create/create.customer.controller";
import { ListCustomerController } from "../controller/customer/list/list.customer.controller";

const customersRoutes = Router();

const createCustomerController = new CreateCustomerController();
const listCustomerController = new ListCustomerController();

customersRoutes.post("/", createCustomerController.handle);
customersRoutes.get("/", listCustomerController.handle);

export { customersRoutes };
