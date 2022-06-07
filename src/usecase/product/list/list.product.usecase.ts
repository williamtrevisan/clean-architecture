import { ProductRepositoryInterface } from "../../../domain/product/repository/product.repository.interface";
import {
  InputListProductDTO,
  OutputListProductDTO,
  Product,
} from "./list.product.dto";

class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(input: InputListProductDTO): Promise<OutputListProductDTO> {
    const products = await this.productRepository.findAll();

    return this.toOutput(products);
  }

  private toOutput(product: Product[]): OutputListProductDTO {
    return {
      products: product.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}

export { ListProductUseCase };
