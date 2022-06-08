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

  it("should throw an error when name is missing", async () => {
    expect(async () => {
      const customerRepository = customerMockRepository();

      const createCustomerUseCase = new CreateCustomerUseCase(
        customerRepository
      );
      input.name = "";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const outputResponse = await createCustomerUseCase.execute(input);
    }).rejects.toThrow("customer: Name is required");
  });

  it("should throw an error when street is missing", async () => {
    expect(async () => {
      const customerRepository = customerMockRepository();

      const createCustomerUseCase = new CreateCustomerUseCase(
        customerRepository
      );
      input.address.street = "";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const outputResponse = await createCustomerUseCase.execute(input);
    }).rejects.toThrow("Street is required.");
  });

  it("should throw an error when number is missing", async () => {
    expect(async () => {
      const customerRepository = customerMockRepository();

      const createCustomerUseCase = new CreateCustomerUseCase(
        customerRepository
      );
      input.address.street = "Street name";
      input.address.number = null;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const outputResponse = await createCustomerUseCase.execute(input);
    }).rejects.toThrow("Number is required.");
  });

  it("should throw an error when zip is missing", async () => {
    expect(async () => {
      const customerRepository = customerMockRepository();

      const createCustomerUseCase = new CreateCustomerUseCase(
        customerRepository
      );
      input.name = "John";
      input.address.street = "Street name";
      input.address.number = 1;
      input.address.zip = "";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const outputResponse = await createCustomerUseCase.execute(input);
    }).rejects.toThrow("Zip is required.");
  });

  it("should throw an error when city is missing", async () => {
    expect(async () => {
      const customerRepository = customerMockRepository();

      const createCustomerUseCase = new CreateCustomerUseCase(
        customerRepository
      );
      input.name = "John";
      input.address.street = "Street name";
      input.address.number = 1;
      input.address.zip = "95700-000";
      input.address.city = "";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const outputResponse = await createCustomerUseCase.execute(input);
    }).rejects.toThrow("City is required.");
  });
});
