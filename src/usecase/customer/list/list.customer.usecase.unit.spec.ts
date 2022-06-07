import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value_object/address";
import { ListCustomerUseCase } from "./list.customer.usecase";

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

    expect(response.customers.length).toBe(2);
    expect(response.customers[0].id).toBe(customer1.id);
    expect(response.customers[0].name).toBe(customer1.name);
    expect(response.customers[0].address.street).toBe(customer1.address.street);
    expect(response.customers[1].id).toBe(customer2.id);
    expect(response.customers[1].name).toBe(customer2.name);
    expect(response.customers[1].address.street).toBe(customer2.address.street);
  });
});
