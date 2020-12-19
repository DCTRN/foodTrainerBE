import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Product } from '../../../food/models/products/product.model';
import { UserFriends } from '../user-friends/user-friends.model';
import { UserProduct } from '../../../food/models/user-products/user-product.model';

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

  @BeforeInsert()
  @BeforeUpdate()
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
}
