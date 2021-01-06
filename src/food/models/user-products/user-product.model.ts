import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../users/models/user/user.model';
import { Product } from '../products/product.model';
import { MealEatTimeType } from './meal-eat-time-type.enum';

@Entity()
export class UserProduct {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'float' })
  public amount: number;

  @Column({ type: 'timestamp without time zone' })
  public date: Date;

  @Column()
  public mealTimeType: MealEatTimeType;

  @ManyToOne(
    type => Product,
    product => product.userProducts,
    { eager: true },
  )
  public product: Product;

  @ManyToOne(
    type => User,
    user => user.userProducts,
    { eager: true },
  )
  public user: User;
}
