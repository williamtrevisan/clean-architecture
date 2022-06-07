/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateProductUseCase } from "./create.product.usecase";

const input = {
  name: "Product name",
  price: 10,
};

const productMockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Create product use case unit test", () => {
  it("should create a new product", async () => {
    const productRepository = productMockRepository();

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
      const productRepository = productMockRepository();

      const createProductUseCase = new CreateProductUseCase(productRepository);
      input.name = "";
      const outputResponse = await createProductUseCase.execute(input);
    }).rejects.toThrow("Name is required.");
  });

  it("should throw an error when price is missing", async () => {
    expect(async () => {
      const productRepository = productMockRepository();

      const createProductUseCase = new CreateProductUseCase(productRepository);
      input.name = "Product name";
      input.price = null;
      const outputResponse = await createProductUseCase.execute(input);
    }).rejects.toThrow("Price must be greater than zero.");
  });

  it("should throw an error when price is lower than zero", async () => {
    expect(async () => {
      const productRepository = productMockRepository();

      const createProductUseCase = new CreateProductUseCase(productRepository);
      input.name = "Product name";
      input.price = -2;
      const outputResponse = await createProductUseCase.execute(input);
    }).rejects.toThrow("Price must be greater than zero.");
  });
});
