import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService){}

    async login(userDto: CreateUserDto){
       
    }
    
    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getUserByLogin(userDto.login);
        if (candidate) {
            throw new HttpException('User with this login already exists', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    async generateToken(user: User){
        const payload = {nickname: user.nickname, login: user.login, id: user.id}
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
