import { Sequelize } from "sequelize-typescript";

import { ProductModel } from "../../../infrastructure/product/db/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";
import { CreateProductUseCase } from "../create/create.product.usecase";
import { ListProductUseCase } from "./list.product.usecase";

describe("List product use case integration test", () => {
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

  it("should list a product", async () => {
    const productRepository = new ProductRepository();

    const createProductUseCase = new CreateProductUseCase(productRepository);
    const product1 = await createProductUseCase.execute({
      name: "Product name",
      price: 10,
    });
    const product2 = await createProductUseCase.execute({
      name: "Product name 2",
      price: 30,
    });

    const listProductUseCase = new ListProductUseCase(productRepository);
    const outputResponse = await listProductUseCase.execute({});

    expect(outputResponse.products.length).toBe(2);
    expect(outputResponse.products[0].id).toBe(product1.id);
    expect(outputResponse.products[0].name).toBe(product1.name);
    expect(outputResponse.products[0].price).toBe(product1.price);
    expect(outputResponse.products[1].id).toBe(product2.id);
    expect(outputResponse.products[1].name).toBe(product2.name);
    expect(outputResponse.products[1].price).toBe(product2.price);
  });
});
