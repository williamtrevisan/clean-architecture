import { RepositoryInterface } from "../../@shared/repository/repository.interface";
import { ProductInterface } from "../entity/product.interface";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProductRepositoryInterface
  extends RepositoryInterface<ProductInterface> {}

export { ProductRepositoryInterface };
