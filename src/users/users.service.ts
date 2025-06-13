import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto):Promise<User>{
        const user = await this.userRepository.create(dto, {raw: true});
        console.log("user - ",user.get("id"));
        return user;
    }

    async getAllUsers():Promise<User[]>{
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByLogin(login: string):Promise<User>{
        const user = await this.userRepository.findOne({where: {login}, include: {all: true}})
        return user;
    }
    
    @UseGuards(JwtAuthGuard)
    async getUserById(id: number):Promise<User>{
        const user = await this.userRepository.findOne({where: {id}, include: {all: true}})
        return user;
    }
}
