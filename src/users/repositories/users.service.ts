import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository } from 'typeorm';
import { UserDTO } from '../models/user/user-dto.model';
import { User } from '../models/user/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async add(user: UserDTO): Promise<User> {
    const dbUser = this.userRepository.create(user);
    return this.userRepository.save(dbUser);
  }

  public async update(id: number, user: Partial<User>): Promise<User> {
    const u = await this.updateEntityValues(id, user);
    await this.userRepository.save(u);
    return this.findById(id);
  }

  public async findById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  public async findByUsername(username: string): Promise<User> {
    const users = await this.userRepository.find({
      where: { username },
    });

    if (!users?.length) {
      return;
    }
    return users[0];
  }

  public async findBySimilarToUsername(username: string): Promise<Array<User>> {
    return await this.userRepository.find({
      where: { username: Like(`%${username}%`) },
    });
  }

  public async findAll(): Promise<Array<User>> {
    return this.userRepository.find();
  }

  public delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  private async updateEntityValues(id: number, user: Partial<User>) {
    const u = await this.findById(id);
    Object.keys(user).forEach((key: string) => {
      u[key] = user[key];
    });
    return u;
  }
}
