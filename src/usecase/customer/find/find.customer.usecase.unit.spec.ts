import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value_object/address";
import { FindCustomerUseCase } from "./find.customer.usecase";

const customer = CustomerFactory.createWithAddressAndActive(
  "John",
  new Address("Street name", 1, "zipcode", "City name")
);

const customerMockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  };
};

describe("Find customer use case unit test", () => {
  it("should find a customer", async () => {
    const customerRepository = customerMockRepository();
    const input = { id: customer.id };
    const output = {
      id: customer.id,
      name: "John",
      address: {
        street: "Street name",
        number: 1,
        zip: "zipcode",
        city: "City name",
      },
    };

    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
    const outputResponse = await findCustomerUseCase.execute(input);

    expect(outputResponse).toEqual(output);
  });
});
