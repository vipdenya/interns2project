import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

import { IUser } from './interfaces/user.interface';
import { ModelUserDto } from './dto/model-user.dto';

@Injectable()
export class UsersService {
    private client: ClientProxy;
    private users: IUser[] = [];
    
    constructor() {
        this.client = ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: '127.0.0.1',
            port: 8877,
          },
        });
      }

    public getAllUsers() {
      return this.client.send<IUser, IUser[]>('getAllUsers', this.users);
    }

    public getUserById(id: string) {
      return this.client.send<IUser, string>('getUserById', id);
    }

    public createUser(createUserDto: ModelUserDto) {
      return this.client.send<ModelUserDto>('createUser', createUserDto);    
    }

    public updateUser(id: string, updateUserDto: ModelUserDto) {
      const { firstName, lastName, email, password } = updateUserDto;
      const _updateUser: IUser = {
        id,
        firstName,
        lastName,
        email,
        password,
      }
      console.log(_updateUser);
      return this.client.send<IUser, IUser>('updateUser', _updateUser);
    }
    
    public deleteUserById(id: string) { 
      console.log('id', id);    
      return this.client.send<IUser, string>('deleteUserById', id);
    }
}
