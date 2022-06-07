import { ProductFactory } from "../../../domain/product/factory/product.factory";

const product1 = ProductFactory.create("Product name", 10);

const product2 = ProductFactory.create("Product name 2", 30);

const productMockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  };
};

describe("List product use case unit test", () => {
  it("should list a product", async () => {
    const productRepository = productMockRepository();

    const listProductUseCase = new ListProductUseCase(productRepository);
    const outputResponse = await listProductUseCase.execute({});

    expect(outputResponse.customers.length).toBe(2);
    expect(outputResponse.customers[0].id).toBe(product1.id);
    expect(outputResponse.customers[0].name).toBe(product1.name);
    expect(outputResponse.customers[0].price).toBe(product1.price);
    expect(outputResponse.customers[1].id).toBe(product2.id);
    expect(outputResponse.customers[1].name).toBe(product2.name);
    expect(outputResponse.customers[1].price).toBe(product2.price);
  });
});
