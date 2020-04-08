import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

    async getAllUsers(): Promise<IUser[]> {
        return await this.userModel.find().exec();
    }    
    
    async getUserById(id: string): Promise<IUser> {
        let user: IUser;
        try {
            user = await this.userModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('User not found!');           
        }
        if(!user) {
            throw new NotFoundException('User not found!');
        }
        return user;
    }

    async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(createUserDto.password, salt);

        const newUser = new this.userModel(_.assignIn(createUserDto, {password: hash}));
        return await newUser.save();
    }

    async updateUser(_updateUser: IUser) {
        const updatedUser = await this.getUserById(_updateUser.id);
        if(_updateUser.firstName) {
            updatedUser.firstName = _updateUser.firstName;
        }
        if(_updateUser.lastName) {
            updatedUser.lastName = _updateUser.lastName;
        }
        if(_updateUser.email) {
            updatedUser.email = _updateUser.email;
        }
        if(_updateUser.password) {
            updatedUser.password = _updateUser.password;
        }
        updatedUser.save();
        return updatedUser;
    }

    async deleteUserById(id: string) {
        const result = await this.userModel.deleteOne({_id: id}).exec();
        if(result.n === 0) {
            throw new NotFoundException('User not found!');             
        }
        return result;
    }
}
