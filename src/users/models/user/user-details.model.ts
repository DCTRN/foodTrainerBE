import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../../food/models/products/product.model';
import { User } from './user.model';

@Entity()
export class UserDetails {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public age: number;
  @Column()
  public height: number;
  @Column()
  public weight: number;
  @Column()
  public sex: string;

  @OneToOne(
    type => Product,
    product => product.creator,
  )
  public user: User;
}
