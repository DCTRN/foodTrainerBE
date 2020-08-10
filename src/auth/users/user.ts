import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['username', 'email', 'phoneNumber'])
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public username: string;

  @Column()
  public password: string;

  @Column()
  public email: string;

  @Column()
  public birthDate: Date;

  @Column()
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
}
