import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer.repository.interface";
import { Address } from "../../../domain/customer/value_object/address";
import {
  InputUpdateCustomerDTO,
  OutputUpdateCustomerDTO,
} from "./update.customer.dto";

class UpdateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: InputUpdateCustomerDTO
  ): Promise<OutputUpdateCustomerDTO> {
    const customer = await this.customerRepository.find(input.id);

    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    );

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city,
      },
    };
  }
}

export { UpdateCustomerUseCase };
