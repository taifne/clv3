
import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { CreateUserDto } from '@/modules/user/dto/create-user-dto';
import {
  USERSERVICE_PACKAGE_NAME
  , User, UserServiceControllerMethods,
  UserServiceController, FindAllRequest,
  FindAllResponse,
  Users,
  CreateUserResponse,
  CreateUserRequest,
  UpdateUserRequest,
  UpdateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  GetUserRequest
}
  from '@/proto/user';
import { Observable } from 'rxjs';
@Controller('users')
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) { }
  findOne(request: GetUserRequest): User | Observable<User> | Promise<User> {
    throw new Error('Method not implemented.');
  }

  @Get()
  async findAll(req: FindAllRequest): Promise<Users> {
    const users = await this.userService.findAll();
    return users;
  }

  async create(userData: CreateUserRequest): Promise<CreateUserResponse> {
    return { user: await this.userService.create(userData) };
  }



  async update(UserData: UpdateUserRequest): Promise<UpdateUserResponse> {
    return { user: await this.userService.update(UserData.id, UserData) };
  }


  async remove(UserData: DeleteUserRequest): Promise<DeleteUserResponse> {
    return { message: await this.userService.remove(UserData.id) };
  }
}
