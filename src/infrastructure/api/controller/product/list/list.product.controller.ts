import { Request, Response } from "express";

import { ListProductUseCase } from "../../../../../usecase/product/list/list.product.usecase";
import { ProductRepository } from "../../../../product/repository/sequelize/product.repository";

class ListProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listProductUseCase = new ListProductUseCase(new ProductRepository());

    const products = await listProductUseCase.execute({});

    return response.status(200).send(products);
  }
}

export { ListProductController };
