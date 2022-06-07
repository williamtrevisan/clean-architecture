import { Request, Response } from "express";

import { CreateCustomerUseCase } from "../../../../../usecase/customer/create/create.customer.usecase";
import { CustomerRepository } from "../../../../customer/repository/sequelize/customer.repository";

class CreateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, address } = request.body;

      const createCustomerUseCase = new CreateCustomerUseCase(
        new CustomerRepository()
      );
      const customer = await createCustomerUseCase.execute({
        name,
        address: {
          street: address.street,
          number: address.number,
          zip: address.zip,
          city: address.city,
        },
      });

      return response.status(201).send(customer);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}

export { CreateCustomerController };
