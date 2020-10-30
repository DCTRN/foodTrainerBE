import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.model';

@Entity()
export class UserFriends {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'boolean', default: false })
  public isAccepted: boolean;

  @Column({ type: 'int' })
  friendshipRequesterId: number;

  @CreateDateColumn()
  public friendshipRequestDate: Date;

  @Column({ type: 'timestamp without time zone', nullable: true })
  public friendshipAcceptDate: Date;

  @ManyToOne(
    type => User,
    user => user.userFriends1,
    {
      cascade: true,
      eager: true,
    },
  )
  user: User;

  @ManyToOne(
    type => User,
    user => user.userFriends2,
    {
      cascade: true,
      eager: true,
    },
  )
  friend: User;

  @BeforeUpdate()
  public createFriendshipAcceptDate(): void {
    this.friendshipAcceptDate = new Date();
  }
}
