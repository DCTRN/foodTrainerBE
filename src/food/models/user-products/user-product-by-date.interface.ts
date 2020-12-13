import { UserProductDTO } from './user-product-dto.model';

export interface UserProductByDate {
  date: Date;
  userProducts: UserProductDTO[];
}
