import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto, CreateUserResponse } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.model';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { JwtDecodeGuard } from './jwt-decode.guard';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/login')
    login(@Body() userDto: CreateUserDto):Promise<CreateUserResponse>{
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto):Promise<CreateUserResponse>{
        return this.authService.registration(userDto)
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('/me')
    me(@Req() req: Request & { user: User }): Promise<User> {
        return this.authService.me(req.user.id);
    }

    @UseGuards(JwtDecodeGuard)
    @Put('/refresh')
    refresh(@Req() req: Request & { user: User }): Promise<{token: string}>{
        return this.authService.refresh(req.user.id)
    }

}
