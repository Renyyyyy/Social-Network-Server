import { Injectable } from '@nestjs/common';
import { Follower } from './followers.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { FollowerDto } from './dto/follower.dto';

@Injectable()
export class FollowersService {
    constructor(@InjectModel(Follower) private followerRepository: typeof Follower, @InjectModel(User) private userRepository: typeof User) {}
        
    
    async create(dto: FollowerDto, user: User): Promise<Follower | { message: string }> {
        const userToFollow = await this.userRepository.findByPk(dto.followerId);
        if (!userToFollow) {
            return { message: 'User to follow not found' };
        }
        
        if (dto.followerId === user.id) {
            return { message: 'You cannot follow yourself' };
        }
    
        const followerCheck = await this.followerRepository.findOne({
            where: { userId: user.id, followerId: dto.followerId }
        });
        
        if (followerCheck) {
            return { message: 'You are already following this user' };
        }
        
        return await this.followerRepository.create({
            userId: user.id,
            followerId: dto.followerId
        });
    }
    
    async delete(dto: FollowerDto, user: User): Promise<{ message: string }> {
        const follower = await this.followerRepository.findOne({
            where: { userId: user.id, followerId: dto.followerId }
        });
        
        if (!follower) {
            return { message: 'Subscription not found' };
        }
        
        await follower.destroy();
        
        return { message: 'Subscription deleted successfully' };
    }
}
