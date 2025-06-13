import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import { CreateUserDto, CreateUserResponse } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService){}

    async login(userDto: CreateUserDto):Promise<CreateUserResponse>{
       const user = await this.validateUser(userDto)
       return this.generateToken(user)
    }

    
    async registration(userDto: CreateUserDto):Promise<CreateUserResponse>{
        const candidate = await this.userService.getUserByLogin(userDto.login);
        if (candidate) {
            throw new HttpException('User with this login already exists', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    async me(userId: number): Promise<User> {
        const user = await this.userService.getUserById(userId);
        if (!user) {
          throw new UnauthorizedException('User not found');
        }
        return user;
    }

    private async generateToken(user: User): Promise<{token: string}>{
        const payload = {nickname: user.get("nickname"), login: user.get("login"), id: user.get("id")}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto):Promise<User>{
        const user = await this.userService.getUserByLogin(userDto.login)
        const passwordEquals = await bcrypt.compare(userDto.password, user.get('password'))
        if(user && passwordEquals){
            return user;
        }
        throw new UnauthorizedException({message: 'Incorrect login or password'})
    }
}
