import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/auth/users/models/UserDTO.model';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async add(user: UserDTO): Promise<User> {
    try {
      const dbUser = this.userRepository.create(user);
      return this.userRepository.save(dbUser);
    } catch (error) {
      console.log('error');
      console.log(error);
    }
  }

  public async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
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

  public async findAll(): Promise<Array<User>> {
    return this.userRepository.find();
  }

  public delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
