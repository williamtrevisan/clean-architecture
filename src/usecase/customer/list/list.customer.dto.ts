// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InputListCustomerDTO {}

type Customer = {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
};

interface OutputListCustomerDTO {
  customers: Customer[];
}

export { Customer, InputListCustomerDTO, OutputListCustomerDTO };
