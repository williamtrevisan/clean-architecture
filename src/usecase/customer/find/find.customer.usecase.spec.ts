import { Sequelize } from "sequelize-typescript";

import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value_object/address";
import { CustomerModel } from "../../../infrastructure/customer/db/sequelize/customer.model";
import { CustomerRepository } from "../../../infrastructure/customer/repository/sequelize/customer.repository";

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
    const customer = CustomerFactory.createWithAddressAndActive(
      "John",
      new Address("Street name", 1, "zipcode", "City name")
    );
    const costumerRepository = new CustomerRepository();
    await costumerRepository.create(customer);
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

    const findCustomerUseCase = new FindCustomerUseCase(CustomerRepository);
    const outputResponse = findCustomerUseCase.execute(input);

    expect(outputResponse).toEqual(output);
  });
});
