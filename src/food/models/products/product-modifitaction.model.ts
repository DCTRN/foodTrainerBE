import { Type } from 'class-transformer';
import { IsInt, Min, ValidateNested } from 'class-validator';
import { ProductDTO } from './product-dto.model';

export class ProductModification {
  @IsInt()
  @Min(1)
  public userId: number;

  @ValidateNested({ each: true })
  @Type(type => ProductDTO)
  public product: ProductDTO;
}
