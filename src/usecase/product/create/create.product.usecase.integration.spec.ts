/* eslint-disable @typescript-eslint/no-unused-vars */
import { Sequelize } from "sequelize-typescript";

import { ProductModel } from "../../../infrastructure/product/db/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";
import { CreateProductUseCase } from "./create.product.usecase";

const input = {
  name: "Product name",
  price: 10.0,
};

describe("Create product use case integration test", () => {
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

  it("should create a new product", async () => {
    const productRepository = new ProductRepository();

    const createProductUseCase = new CreateProductUseCase(productRepository);
    const outputResponse = await createProductUseCase.execute(input);

    expect(outputResponse).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when name is missing", async () => {
    expect(async () => {
      const productRepository = new ProductRepository();

      const createProductUseCase = new CreateProductUseCase(productRepository);
      input.name = "";
      const outputResponse = await createProductUseCase.execute(input);
    }).rejects.toThrow("product: Name is required");
  });

  it("should throw an error when price is lower than zero", async () => {
    expect(async () => {
      const productRepository = new ProductRepository();

      const createProductUseCase = new CreateProductUseCase(productRepository);
      input.name = "Product name";
      input.price = -2;
      const outputResponse = await createProductUseCase.execute(input);
    }).rejects.toThrow("product: Price must be greater than zero");
  });
});
