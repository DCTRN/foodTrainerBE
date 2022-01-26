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

  @Column({ type: 'int', default: 0 })
  public isAccepted: boolean;

  @Column({ type: 'int' })
  public friendshipRequesterId: number;

  @CreateDateColumn()
  public friendshipRequestDate: Date;

  @Column({ type: 'date', nullable: true })
  public friendshipAcceptDate: Date;

  @ManyToOne(
    type => User,
    user => user.userFriends1,
    { eager: true },
  )
  public user: User;

  @ManyToOne(
    type => User,
    user => user.userFriends2,
    { eager: true },
  )
  public friend: User;

  @BeforeUpdate()
  public createFriendshipAcceptDate(): void {
    this.friendshipAcceptDate = new Date();
  }
}
