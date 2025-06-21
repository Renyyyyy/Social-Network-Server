import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommDto } from './dto/create-com.dto';
import { Comment } from './comments.model';
import { UpdateCommDto } from './dto/update-com.dto';
import { DeleteCommDto } from './dto/delete-com.dto';

@Injectable()
export class CommentsService {
    
    constructor(@InjectModel(Comment) private commRepository: typeof Comment) {}
    
    async create(dto: CreateCommDto): Promise<Comment> {
        const comment = await this.commRepository.create({...dto});
        return comment;
    }

    async update(dto: UpdateCommDto): Promise<Comment> {
        const comment = await this.commRepository.findByPk(dto.id);
        await comment.update({ content: dto.content });
        return comment;
    }

    async delete(dto: DeleteCommDto): Promise<{ message: string }> {
        await this.commRepository.destroy({ where: { id: dto.id } });
        return { message: 'Comment deleted successfully' };
    }


    async getCommById(id: number): Promise<Comment> {
        return await this.commRepository.findOne({where: { id },include: { all: true }});
    }
}