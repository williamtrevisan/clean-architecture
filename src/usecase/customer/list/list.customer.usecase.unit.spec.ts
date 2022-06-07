import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value_object/address";

const customer1 = CustomerFactory.createWithAddressAndActive(
  "Customer name 1",
  new Address("Street name 1", 1, "zipcode1", "City name 1")
);

const customer2 = CustomerFactory.createWithAddressAndActive(
  "Customer name 2",
  new Address("Street name 2", 1, "zipcode2", "City name 2")
);

const customerMockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
  };
};

describe("List customer use case unit test", () => {
  it("should list a customer", async () => {
    const customerRepository = customerMockRepository();

    const listCustomerUseCase = new ListCustomerUseCase(customerRepository);
    const response = await listCustomerUseCase.execute({});

    expect(response).toEqual([customer1, customer2]);
  });
});
