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

    async update(dto: UpdateCommDto, user: User): Promise<void> {
        const comment = await this.commRepository.findByPk(dto.id);
        
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }
        
        if (String(comment.userId) !== String(user.id)) {
            throw new ForbiddenException('You can only update your own comments');
        }
        
        await comment.update({ content: dto.content });
    }

    async delete(dto: DeleteCommDto, user: User): Promise<void> {
        const comment = await this.commRepository.findByPk(dto.id);
        
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }
        
        if (comment.get("userId") !== user.id) {
            throw new ForbiddenException('You can only delete your own comments');
        }
        
        await this.commRepository.destroy({ where: { id: dto.id } });
    }


    async getCommById(id: number): Promise<Comment> {
        return await this.commRepository.findOne({where: { id },include: { all: true }});
    }

    async getAllComments(offset = 0, limit = 10): Promise<Comment[]>{
        const comms = await this.commRepository.findAll({include: {all: true}, offset: offset, limit: limit});
        return comms/*.map(comms => {
            delete comms.author.password;
            return comms
        });*/
    }
}