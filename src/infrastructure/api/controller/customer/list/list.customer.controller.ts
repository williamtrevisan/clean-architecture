import { Request, Response } from "express";

import { ListCustomerUseCase } from "../../../../../usecase/customer/list/list.customer.usecase";
import { CustomerRepository } from "../../../../customer/repository/sequelize/customer.repository";

class ListCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listCustomerUseCase = new ListCustomerUseCase(
        new CustomerRepository()
      );

      const customers = await listCustomerUseCase.execute({});

      return response.status(200).send(customers);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}

export { ListCustomerController };
