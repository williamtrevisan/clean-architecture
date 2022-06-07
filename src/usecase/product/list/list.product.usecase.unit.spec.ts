import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { ListProductUseCase } from "./list.product.usecase";

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

    expect(outputResponse.products.length).toBe(2);
    expect(outputResponse.products[0].id).toBe(product1.id);
    expect(outputResponse.products[0].name).toBe(product1.name);
    expect(outputResponse.products[0].price).toBe(product1.price);
    expect(outputResponse.products[1].id).toBe(product2.id);
    expect(outputResponse.products[1].name).toBe(product2.name);
    expect(outputResponse.products[1].price).toBe(product2.price);
  });
});
