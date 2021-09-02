import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DeleteResult, Like, Repository } from 'typeorm';
import { UserDTO } from '../models/user/user-dto.model';
import { UserWithNutritionGoalsDTO } from '../models/user/user-with-nurition-goals-dto.model';
import { User } from '../models/user/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async add(user: UserDTO): Promise<User> {
    const dbUser = this.userRepository.create(user);
    dbUser.password = bcrypt.hashSync(dbUser.password, 10);
    return this.userRepository.save(dbUser);
  }

  public async update(
    id: number,
    user: Partial<UserWithNutritionGoalsDTO>,
  ): Promise<User> {
    const u = await this.updateEntityValues(id, user);
    // TODO test this line
    if (user?.password) {
      u.password = bcrypt.hashSync(u.password, 10);
    }
    await this.userRepository.save(u);
    return this.findById(id);
  }

  public async findById(id: number): Promise<User> {
    // return this.userRepository.findOne(id);
    // TODO test with new fields
    const users = await this.userRepository.find({
      where: { id },
      relations: ['nutritionGoals', 'details'],
    });

    if (!users?.length) {
      return;
    }
    return users[0];
  }

  public async findByUsername(username: string): Promise<User> {
    // TODO test with new fields
    const users = await this.userRepository.find({
      where: { username },
      relations: ['nutritionGoals', 'details'],
    });

    if (!users?.length) {
      return;
    }
    return users[0];
  }

  public async findBySimilarToUsername(username: string): Promise<Array<User>> {
    return await this.userRepository.find({
      where: { username: Like(`%${username}%`) },
      // TODO test with new fields
      relations: ['nutritionGoals', 'details'],
    });
  }

  public async findAll(): Promise<Array<User>> {
    return this.userRepository.find({
      // TODO test with new fields
      relations: ['nutritionGoals', 'details'],
    });
  }

  public delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  private async updateEntityValues(
    id: number,
    user: Partial<UserWithNutritionGoalsDTO>,
  ) {
    const u = await this.findById(id);
    Object.keys(user).forEach((key: string) => {
      const modifiedValue = user[key];
      u[key] = modifiedValue;
    });
    return u;
  }
}
