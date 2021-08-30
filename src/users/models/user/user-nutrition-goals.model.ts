import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../../food/models/products/product.model';
import { User } from './user.model';

@Entity()
export class UserNutritionGoals {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public kcal: number;

  @Column()
  public protein: number;

  @Column()
  public carbs: number;

  @Column()
  public fats: number;

  @OneToOne(
    type => Product,
    product => product.creator,
  )
  public user: User;
}
