import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { ModelUserDto } from './dto/model-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get('/:id')
    async getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }

    @Post()
    async createUser(@Body() createUserDto: ModelUserDto) {
        return this.usersService.createUser(createUserDto);
    }    

    @Patch('/:id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: ModelUserDto,
    ) {
        return this.usersService.updateUser(id, updateUserDto);
    }       
    
    @Delete('/:id')
    async deleteUserById(@Param('id') id: string) {
        return this.usersService.deleteUserById(id);
    }
}
