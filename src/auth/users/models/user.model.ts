import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

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
}
