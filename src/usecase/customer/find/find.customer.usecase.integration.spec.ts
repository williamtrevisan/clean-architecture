import { Sequelize } from "sequelize-typescript";

import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value_object/address";
import { CustomerModel } from "../../../infrastructure/customer/db/sequelize/customer.model";
import { CustomerRepository } from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { FindCustomerUseCase } from "./find.customer.usecase";

describe("Find customer use case integration test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = CustomerFactory.createWithAddressAndActive(
      "John",
      new Address("Street name", 1, "zipcode", "City name")
    );
    await customerRepository.create(customer);
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

  it("should not find a customer", async () => {
    expect(async () => {
      const customerRepository = new CustomerRepository();
      const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await findCustomerUseCase.execute({ id: "123" });
    }).rejects.toThrow("Customer not found");
  });
});
