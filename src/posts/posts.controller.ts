import { Body, Controller, Delete, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Post as PostModel} from './posts.model';
import { User } from 'src/users/users.model';
import { DeletePostDto } from './dto/delete-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtDecodeGuard } from 'src/auth/jwt-decode.guard';

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService){}

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    create(@Body() dto: CreatePostDto, @Req() req: Request & { user: User }): Promise<PostModel> {
        return this.postService.create(dto, req.user);
    }
    
    @UseGuards(JwtAuthGuard)
    @Put('/update')
    update(@Body() dto: UpdatePostDto, @Req() req: Request & { user: User }): Promise<{ message: string }> {
        return this.postService.update(dto, req.user);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    delete(@Body() dto: DeletePostDto, @Req() req: Request & { user: User }) {
        return this.postService.delete(dto, req.user);
    }
}
