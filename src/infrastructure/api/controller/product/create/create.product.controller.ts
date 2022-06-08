import { Request, Response } from "express";

import { CreateProductUseCase } from "../../../../../usecase/product/create/create.product.usecase";
import { ProductRepository } from "../../../../product/repository/sequelize/product.repository";

class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, price } = request.body;

      const createProductUseCase = new CreateProductUseCase(
        new ProductRepository()
      );

      const product = await createProductUseCase.execute({
        name,
        price,
      });

      return response.status(201).send(product);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}

export { CreateProductController };
