import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Post as PostModel} from './posts.model';

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService){

    }

    @Post('/create')
    createPost(@Body() dto: CreatePostDto):Promise<PostModel>{
        return this.postService.create(dto)
    }

    @Put('/edit')
    editPost(){

    }

    @Delete('/delete')
    deletePost(){
        
    }
}
