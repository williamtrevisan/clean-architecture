import { Request, Response } from "express";

import { ListCustomerUseCase } from "../../../../../usecase/customer/list/list.customer.usecase";
import { CustomerRepository } from "../../../../customer/repository/sequelize/customer.repository";
import { CustomerPresenter } from "../../../presenters/customer.presenter";

class ListCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCustomerUseCase = new ListCustomerUseCase(
      new CustomerRepository()
    );

    const customers = await listCustomerUseCase.execute({});

    return response.format({
      json: async () => response.status(200).send(customers),
      xml: async () =>
        response.status(200).send(CustomerPresenter.listXML(customers)),
    });
  }
}

export { ListCustomerController };
