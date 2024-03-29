import * as bcrypt from 'bcrypt';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Product } from '../../../food/models/products/product.model';
import { UserProduct } from '../../../food/models/user-products/user-product.model';
import { UserFriends } from '../user-friends/user-friends.model';
import { UserDetails } from './user-details.model';
import { UserNutritionGoals } from './user-nutrition-goals.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Unique('Username must be unique', ['username'])
  public username: string;

  @Column()
  public password: string;

  @Column()
  @Unique('Email must be unique', ['email'])
  public email: string;

  @Column()
  public birthDate: Date;

  @Column()
  @Unique('Phone number must be unique', ['phoneNumber'])
  public phoneNumber: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @CreateDateColumn()
  public accountCreationDate: Date;

  @Column({ default: 1 })
  public authenticationLevel: number;

  @Column({ default: true })
  public isActive: boolean;

  public hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @OneToMany(
    type => UserFriends,
    userFiends => userFiends.user,
  )
  public userFriends1: UserFriends[];

  @OneToMany(
    type => UserFriends,
    userFiends => userFiends.friend,
  )
  public userFriends2: UserFriends[];

  @OneToMany(
    type => Product,
    product => product.creator,
  )
  public products: Product[];

  @OneToMany(
    type => UserProduct,
    userProduct => userProduct.user,
  )
  public userProducts: UserProduct[];

  @OneToOne(
    type => UserNutritionGoals,
    userNutritionGoals => userNutritionGoals.user,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  public nutritionGoals: UserNutritionGoals;

  @OneToOne(
    type => UserDetails,
    userDetails => userDetails.user,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  public details: UserDetails;
}
