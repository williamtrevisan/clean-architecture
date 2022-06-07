import { Sequelize } from "sequelize-typescript";
import { ExclusionConstraintError } from "sequelize/types";

import { ProductModel } from "../../../infrastructure/product/db/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";
import { CreateProductUseCase } from "../create/create.product.usecase";

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

  describe("Update product use case integration test", () => {
    it("should update a product", async () => {
      const productRepository = new ProductRepository();
      const createProductUseCase = new CreateProductUseCase(productRepository);
      const product = await createProductUseCase.execute({
        name: "Product name",
        price: 10,
      });

      const updateProductUseCase = new UpdateProductUseCase(productRepository);
      const productUpdated = await updateProductUseCase({
        id: product.id,
        name: "Product name updated",
        price: 30,
      });

      expect(productUpdated.id).toBe(product.id);
      expect(productUpdated.name).toBe("Product name updated");
      expect(productUpdated.price).toBe(30);
    });
  });
});
