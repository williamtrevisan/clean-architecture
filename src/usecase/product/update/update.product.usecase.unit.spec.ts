import { ProductFactory } from "../../../domain/product/factory/product.factory";

const product = ProductFactory.create("Product name", 15);

const input = {
  id: product.id,
  name: "Product name updated",
  price: 30,
};

const productMockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  };
};

describe("Update product use case unit test", () => {
  it("should update a product", async () => {
    const productRepository = productMockRepository();

    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const outputResponse = await updateProductUseCase.execute(input);

    expect(outputResponse).toEqual(input);
  });
});
