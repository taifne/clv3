import { Users } from '@/proto/user/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/modules/user/user.entity';
import { CreateUserDto } from '@/modules/user/dto/create-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll() {
    return { users: await this.userRepository.find() };
  }

  async findOne(id: any): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }

  async create(userData: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  }

  async update(id: any, userData: Partial<User>): Promise<User | undefined> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      return undefined;
    }
    await this.userRepository.update(id, userData);
    return await this.userRepository.findOne(id);
  }

  async remove(id: any) {

    try {
      await this.userRepository.delete(id);
      return " successfully removed"
    }
    catch (err) {
      return "delete failed"
    }
  }
}
