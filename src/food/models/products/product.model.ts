import {
  Column,
  Entity,

  ManyToOne,
  OneToMany,

  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';
import { User } from '../../../users/models/user/user.model';
import { UserProduct } from '../user-products/user-product.model';

@Entity()
@Unique('Product already exists', ['producer', 'name'])
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public producer: string;

  @Column()
  public name: string;

  @Column()
  public unit: string;

  @Column({ type: 'float' })
  public amount: number;

  @Column({ type: 'int' })
  public kcal: number;

  @Column({ type: 'float' })
  public protein: number;

  @Column({ type: 'float' })
  public carbohydrates: number;

  @Column({ type: 'float' })
  public fats: number;

  @ManyToOne(
    type => User,
    user => user.products,
    {
      eager: true,
    },
  )
  public creator: User;

  @OneToMany(
    type => UserProduct,
    userProduct => userProduct.product,
  )
  public userProducts: UserProduct[];
}
