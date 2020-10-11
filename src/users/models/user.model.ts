import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserFriends } from './user-friends.model';

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
  public hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @OneToMany(
    type => UserFriends,
    userFiends => userFiends.user,
  )
  userFriends1: UserFriends[];

  @OneToMany(
    type => UserFriends,
    userFiends => userFiends.friend,
  )
  userFriends2: UserFriends[];
}
