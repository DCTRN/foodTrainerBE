import { IsInstance, IsInt, Min } from 'class-validator';
import { UserProductDTO } from './user-product-dto.model';

export class UserProductModification {
  @IsInt()
  @Min(1)
  public userId: number;

  @IsInstance(UserProductDTO)
  public product: UserProductDTO;
}
