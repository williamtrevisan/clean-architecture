/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product name", 100);
    }).toThrowError("product: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("productId", "", 100);
    }).toThrowError("product: Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("productId", "Product name", -1);
    }).toThrowError("product: Price must be greater than zero");
  });

  it("should throw all errors when id is empty and price is less than zero", () => {
    expect(() => {
      const product = new Product("", "Product name", -1);
    }).toThrowError(
      "product: Id is required, product: Price must be greater than zero"
    );
  });

  it("should throw all errors when name is empty and price is less than zero", () => {
    expect(() => {
      const product = new Product("productId", "", -1);
    }).toThrowError(
      "product: Name is required, product: Price must be greater than zero"
    );
  });

  it("should throw all errors when id, name are empty and price is less than zero", () => {
    expect(() => {
      const product = new Product("", "", -1);
    }).toThrowError(
      "product: Id is required, product: Name is required, product: Price must be greater than zero"
    );
  });

  it("should change name", () => {
    const product = new Product("productId", "Product name", 100);

    product.changeName("Product name edited");

    expect(product.name).toBe("Product name edited");
  });

  it("should change price", () => {
    const product = new Product("productId", "Product name", 100);

    product.changePrice(150);

    expect(product.price).toBe(150);
  });
});
