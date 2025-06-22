import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/users/users.model';
import { DeletePostDto } from './dto/delete-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post){}

    async create(dto: CreatePostDto, user: User):Promise<Post>{
        const post = await this.postRepository.create({...dto, userId: user.id})
        return post;
    }

    async update(dto: UpdatePostDto, user: User): Promise<{ message: string }> {
        const post = await this.postRepository.findByPk(dto.id);
        if(!post){
            return { message: 'Post not exist' };
        }
        if(post.get("userId") == user.id){
            await post.update({ title: dto.title, content: dto.content });
            return { message: 'Post updated successfully' };
        }
        return { message: 'You may only update your own posts' };
    }
    
    async delete(dto: DeletePostDto, user: User): Promise<{ message: string }> {
        const post = await this.postRepository.findByPk(dto.id);
        if(!post){
            return { message: 'Post not exist' };
        }
        if(post.get("userId") == user.id){
            await this.postRepository.destroy({ where: { id: dto.id } });
            return { message: 'Post deleted successfully' };
        }
        console.log(post.get("userId") + " " + user.id)
        return { message: 'You may only delete your own posts' };
    }
}
