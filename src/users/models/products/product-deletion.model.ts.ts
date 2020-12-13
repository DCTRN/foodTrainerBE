import { IsInt, Min } from 'class-validator';

export class ProductDeletion {
  @IsInt()
  @Min(1)
  public userId: number;

  @IsInt()
  @Min(1)
  public productId: number;
}
