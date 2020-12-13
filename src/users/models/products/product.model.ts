import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserProduct } from '../user-products/user-product.model';
import { User } from '../user/user.model';

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

  @OneToOne(type => User, {
    eager: true,
  })
  @JoinColumn()
  public creator: User;

  @OneToMany(
    type => UserProduct,
    userProduct => userProduct.product,
  )
  public userProducts: UserProduct[];
}
