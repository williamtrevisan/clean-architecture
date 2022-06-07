interface InputFindCustomerDTO {
  id: string;
}

interface OutputFindCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  }
}

export { InputFindCustomerDTO, OutputFindCustomerDTO };
