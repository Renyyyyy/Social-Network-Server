import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/users/users.model';
import { DeletePostDto } from './dto/delete-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Like } from 'src/likes/likes.model';
import { Comment } from 'src/comments/comments.model';

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post){}

    async create(dto: CreatePostDto, user: User):Promise<Post>{
        const post = await this.postRepository.create({...dto, userId: user.id})
        return post;
    }

    async update(dto: UpdatePostDto, user: User): Promise<void> {
        const post = await this.postRepository.findByPk(dto.id);
        
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        
        if (post.userId !== user.id) {
            throw new ForbiddenException('You may only update your own posts');
        }
        
        await post.update({ 
            title: dto.title, 
            content: dto.content 
        });
    }
    
    async delete(dto: DeletePostDto, user: User): Promise<void> {
        const post = await this.postRepository.findByPk(dto.id);
        
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        
        if (post.userId !== user.id) {
            throw new ForbiddenException('You may only delete your own posts');
        }
        
        await post.destroy();
    }

    async getPostById(id: number): Promise<Post> {
        return this.postRepository.findByPk(id, {
            include: [
                { 
                    model: User,
                    attributes: ['id', 'nickname', 'login'] 
                },
                { 
                    model: Comment,
                    include: [{
                        model: User,
                        attributes: ['id', 'nickname']
                    }]
                },
                { 
                    model: Like,
                    include: [{
                        model: User,
                        attributes: ['id', 'nickname']
                    }]
                }
            ]
        });
    }
}