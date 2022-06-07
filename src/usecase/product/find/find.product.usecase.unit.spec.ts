import { ProductFactory } from "../../../domain/product/factory/product.factory";

const product = ProductFactory.create("Product name", 10);

const productMockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  };
};

describe("Find product use case unit test", () => {
  it("should find a product", async () => {
    const productRepository = productMockRepository();
    const input = { id: product.id };
    const output = {
      id: product.id,
      name: "Product name",
      price: 10,
    };

    const findProductUseCase = new FindProductUseCase(productRepository);
    const outputResponse = await findProductUseCase.execute(input);

    expect(outputResponse).toEqual(output);
  });

  it("should not find a product", async () => {
    expect(async () => {
      const productRepository = productMockRepository();
      productRepository.find.mockImplementation(() => {
        throw new Error("Product not found.");
      });

      const findProductUseCase = new FindProductUseCase(productRepository);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await findProductUseCase.execute({ id: "123" });
    }).rejects.toThrow("Product not found.");
  });
});
