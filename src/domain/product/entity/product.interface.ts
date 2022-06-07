interface ProductInterface {
  changeName(name: string): void;
  changePrice(price: number): void;
  get id(): string;
  get name(): string;
  get price(): number;
}

export { ProductInterface };
