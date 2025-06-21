import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Post as PostModel} from './posts.model';

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService){

    }

    @Post()
    createPost(@Body() dto: CreatePostDto):Promise<PostModel>{
        return this.postService.create(dto)
    }
}
