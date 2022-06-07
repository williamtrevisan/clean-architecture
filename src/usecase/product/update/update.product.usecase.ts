import { ProductRepositoryInterface } from "../../../domain/product/repository/product.repository.interface";
import {
  InputUpdateProductDTO,
  OutputUpdateProductDTO,
} from "./update.product.dto";

class UpdateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute({
    id,
    name,
    price,
  }: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
    const product = await this.productRepository.find(id);

    product.changeName(name);
    product.changePrice(price);

    await this.productRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}

export { UpdateProductUseCase };
