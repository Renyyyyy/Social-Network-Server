import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.authService.createUser(userDto);
    }

    @Get()
    getAll(){
        return this.authService.getAllUsers();
    }
}
