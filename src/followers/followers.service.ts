import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Follower } from './followers.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { FollowerDto } from './dto/follower.dto';

@Injectable()
export class FollowersService {
    constructor(@InjectModel(Follower) private followerRepository: typeof Follower, @InjectModel(User) private userRepository: typeof User) {}
        
    
    async create(dto: FollowerDto, user: User): Promise<Follower> {
        const userToFollow = await this.userRepository.findByPk(dto.followerId);
        if (!userToFollow) {
            throw new NotFoundException('User to follow not found');
        }
        
        if (dto.followerId === user.id) {
            throw new BadRequestException('You cannot follow yourself');
        }
    
        const followerCheck = await this.followerRepository.findOne({
            where: { userId: user.id, followerId: dto.followerId }
        });
        
        if (followerCheck) {
            throw new ConflictException('You are already following this user');
        }
        
        return await this.followerRepository.create({
            userId: user.id,
            followerId: dto.followerId
        });
    }
    
    async delete(dto: FollowerDto, user: User): Promise<void> {
        const follower = await this.followerRepository.findOne({
            where: { userId: user.id, followerId: dto.followerId }
        });
        
        if (!follower) {
            throw new NotFoundException('Subscription not found');
        }
        
        await follower.destroy();
    }
}
