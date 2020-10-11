import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.model';

@Entity()
export class UserFriends {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'boolean', default: true })
  public isAccepted: boolean;

  @ManyToOne(
    type => User,
    user => user.userFriends1,
  )
  user: User;

  @ManyToOne(
    type => User,
    user => user.userFriends2,
  )
  friend: User;
}
