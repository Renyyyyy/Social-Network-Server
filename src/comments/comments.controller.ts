import { Body, Controller, Post, Delete, Put, Req, UseGuards, Get } from '@nestjs/common';
import { CreateCommDto } from './dto/create-com.dto';
import { UpdateCommDto } from './dto/update-com.dto';
import { DeleteCommDto } from './dto/delete-com.dto';
import { CommentsService } from './comments.service';
import { Comment } from './comments.model';
import { User } from 'src/users/users.model';
import { JwtDecodeGuard } from 'src/auth/jwt-decode.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateCommDto, @Req() req: Request & { user: User }): Promise<Comment> {
        return this.commentsService.create(dto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    update(@Body() dto: UpdateCommDto, @Req() req: Request & { user: User }): Promise<{ message: string }> {
        return this.commentsService.update(dto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    delete(@Body() dto: DeleteCommDto, @Req() req: Request & { user: User }) {
        return this.commentsService.delete(dto, req.user);
    }
    
    @Get()
    getAll():Promise<Comment[]>{
        return this.commentsService.getAllComments();
    }
}