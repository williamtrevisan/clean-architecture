import { CreateCustomerUseCase } from "./create.customer.usecase";

const input = {
  name: "John",
  address: {
    street: "Street name",
    number: 1,
    zip: "zipcode",
    city: "City name",
  },
};

const customerMockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Create customer use case unit test", () => {
  it("should create a new customer", async () => {
    const customerRepository = customerMockRepository();

    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
    const outputResponse = await createCustomerUseCase.execute(input);

    expect(outputResponse).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });
  });
});
