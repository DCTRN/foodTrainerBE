import { IsInstance, IsInt, Min } from 'class-validator';
import { ProductDTO } from './product-dto.model';

export class ProductModification {
  @IsInt()
  @Min(1)
  public userId: number;

  @IsInstance(ProductDTO)
  public product: ProductDTO;
}
