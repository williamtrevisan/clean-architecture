import { ProductRepositoryInterface } from "../../../domain/product/repository/product.repository.interface";
import { InputFindProductDTO, OutputFindProductDTO } from "./find.product.dto";

class FindProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute({ id }: InputFindProductDTO): Promise<OutputFindProductDTO> {
    const product = await this.productRepository.find(id);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}

export { FindProductUseCase };
