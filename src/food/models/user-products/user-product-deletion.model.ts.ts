import { IsInt, Min } from 'class-validator';

export class UserProductDeletion {
  @IsInt()
  @Min(1)
  public userId: number;

  @IsInt()
  @Min(1)
  public userProductId: number;
}
