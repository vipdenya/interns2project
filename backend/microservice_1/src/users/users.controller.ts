import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';


@Controller()
export class UsersController {

    constructor(private usersService: UsersService) {}

    @MessagePattern('getAllUsers')
    async getAllUsers() {
        return this.usersService.getAllUsers();
    } 
  
    @MessagePattern('getUserById')
    async getUserById(id: string) {
        return this.usersService.getUserById(id);
    }

    @MessagePattern('createUser')
    async createUser(createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }
    
    @MessagePattern('updateUser')
    async updateUser(_updateUser: IUser) {
        return this.usersService.updateUser(_updateUser);
    }  
    
    @MessagePattern('deleteUserById')
    async deleteUserById(id: string) {
        return this.usersService.deleteUserById(id);
    }

}
