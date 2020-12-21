import { Type } from 'class-transformer';
import { IsInt, Min, ValidateNested } from 'class-validator';
import { UserProductDTO } from './user-product-dto.model';

export class UserProductModification {
  @IsInt()
  @Min(1)
  public userId: number;

  @ValidateNested({ each: true })
  @Type(type => UserProductDTO)
  public product: UserProductDTO;
}
