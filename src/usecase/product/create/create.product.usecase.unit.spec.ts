const input = {
  name: "Product name",
  price: 10.0,
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
    const response = await createProductUseCase.execute(input);

    expect(response).toEqual({
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await createProductUseCase.execute(input);
    }).rejects.toThrow("Name is required.");
  });

  it("should throw an error when price is missing", async () => {
    expect(async () => {
      const productRepository = productMockRepository();

      const createProductUseCase = new CreateProductUseCase(productRepository);
      input.name = "Product name";
      input.price = null;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await createProductUseCase.execute(input);
    }).rejects.toThrow("Price is required.");
  });
});
