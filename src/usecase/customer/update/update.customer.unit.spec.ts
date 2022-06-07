import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value_object/address";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddressAndActive(
  "John",
  new Address("Street name", 1, "zipcode", "City name")
);

const input = {
  id: customer.id,
  name: "Customer name updated",
  address: {
    street: "Street name updated",
    number: 2,
    zip: "Zipcode updated",
    city: "City name updated",
  },
};

const customerMockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  };
};

describe("Update customer use case unit test", () => {
  it("should update a customer", async () => {
    const customerRepository = customerMockRepository();

    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
    const output = await updateCustomerUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
