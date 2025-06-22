import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { LikeDto } from './dto/like.dto';
import { Like } from './likes.model';

@Injectable()
export class LikesService {
    constructor(@InjectModel(Like) private likeRepository: typeof Like) {}
        
    
    async create(dto: LikeDto, user: User): Promise<Like> {
        const checkLike = await this.likeRepository.findOne({
            where: {
                userId: user.id,
                postId: dto.postId
            }
        });
        if (!checkLike){
            const like = await this.likeRepository.create({...dto, userId: user.id});
            return like;
        }
    }
    
    async delete(dto: LikeDto, user: User): Promise<{ message: string }> {
        const like = await this.likeRepository.findByPk(dto.id);
        if(!like){
            return { message: 'Like not exist' };
        }
        if(like.get("userId") == user.id){
            await this.likeRepository.destroy({ where: { id: dto.id } });
            return { message: 'Like deleted successfully' };
        }
        return { message: 'You may only delete your own likes' };
    }
}
