import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Post as PostModel} from './posts.model';
import { User } from 'src/users/users.model';
import { DeletePostDto } from './dto/delete-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreatePostDto, @Req() req: Request & { user: User }): Promise<PostModel> {
        return this.postService.create(dto, req.user);
    }
    
    @Put()
    @UseGuards(JwtAuthGuard)
    async update(
        @Body() dto: UpdatePostDto,
        @Req() req: Request & { user: User }
    ): Promise<void> {
        await this.postService.update(dto, req.user);
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    async delete(
        @Body() dto: DeletePostDto,
        @Req() req: Request & { user: User }
    ): Promise<void> {
        await this.postService.delete(dto, req.user);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getPostById(@Param('id') id: number): Promise<PostModel> {
        return this.postService.getPostById(id);
    }
}