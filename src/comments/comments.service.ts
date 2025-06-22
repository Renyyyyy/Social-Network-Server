import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommDto } from './dto/create-com.dto';
import { Comment } from './comments.model';
import { UpdateCommDto } from './dto/update-com.dto';
import { DeleteCommDto } from './dto/delete-com.dto';
import { User } from 'src/users/users.model';

@Injectable()
export class CommentsService {
    
    constructor(@InjectModel(Comment) private commRepository: typeof Comment) {}
    

    async create(dto: CreateCommDto, user: User): Promise<Comment> {
        const comment = await this.commRepository.create({...dto, userId: user.id});
        return comment;
    }

    async update(dto: UpdateCommDto, user: User): Promise<{ message: string }> {
        const comment = await this.commRepository.findByPk(dto.id);
        if(!comment){
            return { message: 'Comment not exist' };
        }
        if(comment.get("userId") == user.id){
            await comment.update({ content: dto.content });
            return { message: 'Comment updated successfully' };
        }
        return { message: 'You may only update your own comments' };
    }

    async delete(dto: DeleteCommDto, user: User): Promise<{ message: string }> {
        const comment = await this.commRepository.findByPk(dto.id);
        if(!comment){
            return { message: 'Comment not exist' };
        }
        if(comment.get("userId") == user.id){
            await this.commRepository.destroy({ where: { id: dto.id } });
            return { message: 'Comment deleted successfully' };
        }
        return { message: 'You may only delete your own comments' };
    }


    async getCommById(id: number): Promise<Comment> {
        return await this.commRepository.findOne({where: { id },include: { all: true }});
    }

    async getAllComments():Promise<Comment[]>{
        const comms = await this.commRepository.findAll({include: {all: true}/* offset: 10, limit: 10*/});
        return comms/*.map(comms => {
            delete comms.author.password;
            return comms
        });*/
    }
}