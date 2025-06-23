import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/users.model';
import { FollowerDto } from './dto/follower.dto';
import { Follower } from './followers.model';

@Controller('followers')
export class FollowersController {
    constructor(private followerService: FollowersService) {}
        
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: FollowerDto, @Req() req: Request & { user: User }): Promise<Follower | { message: string }> {
        return this.followerService.create(dto, req.user);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete()
    delete(@Body() dto: FollowerDto, @Req() req: Request & { user: User }): Promise<{ message: string }>  {
        return this.followerService.delete(dto, req.user);
    }
}
