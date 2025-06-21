import { Body, Controller, Post, Delete, Put } from '@nestjs/common';
import { CreateCommDto } from './dto/create-com.dto';
import { UpdateCommDto } from './dto/update-com.dto';
import { DeleteCommDto } from './dto/delete-com.dto';
import { CommentsService } from './comments.service';
import { Comment } from './comments.model';

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}
    
    @Post('/create')
    create(@Body() dto: CreateCommDto): Promise<Comment> {
        return this.commentsService.create(dto);
    }

    @Put('/update')
    update(@Body() dto: UpdateCommDto): Promise<Comment> {
        return this.commentsService.update(dto);
    }

    @Delete('/delete')
    delete(@Body() dto: DeleteCommDto) {
        return this.commentsService.delete(dto);
    }
}