interface InputCreateCustomerDTO {
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
}

interface OutputCreateCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
}

export { InputCreateCustomerDTO, OutputCreateCustomerDTO };
