import { Sequelize } from "sequelize-typescript";

import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { ProductModel } from "../../../infrastructure/product/db/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";
import { FindProductUseCase } from "./find.product.usecase";

describe("Find product use case integration test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = ProductFactory.create("Product name", 10);
    await productRepository.create(product);
    const input = { id: product.id };
    const output = {
      id: product.id,
      name: "Product name",
      price: 10,
    };

    const findProductUseCase = new FindProductUseCase(productRepository);
    const outputReponse = await findProductUseCase.execute(input);

    expect(outputReponse).toEqual(output);
  });

  it("should not find a product", async () => {
    expect(async () => {
      const productRepository = new ProductRepository();

      const findProductUseCase = new FindProductUseCase(productRepository);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const outputResponse = await findProductUseCase.execute({ id: "123" });
    }).rejects.toThrow("Product not found.");
  });
});
