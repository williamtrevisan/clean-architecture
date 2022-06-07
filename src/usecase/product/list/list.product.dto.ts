// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InputListProductDTO {}

type Product = {
  id: string;
  name: string;
  price: number;
};

interface OutputListProductDTO {
  products: Product[];
}

export { Product, InputListProductDTO, OutputListProductDTO };
