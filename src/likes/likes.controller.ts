import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/users.model';
import { LikeDto } from './dto/like.dto';
import { LikesService } from './likes.service';
import { Like } from './likes.model';

@Controller('likes')
export class LikesController {

    constructor(private likeService: LikesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: LikeDto, @Req() req: Request & { user: User }): Promise<Like> {
        return this.likeService.create(dto, req.user);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete()
    delete(@Body() dto: LikeDto, @Req() req: Request & { user: User }) {
        return this.likeService.delete(dto, req.user);
    }
}
