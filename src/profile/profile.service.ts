import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Profile } from './profile.model';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(Profile) private profileRepository: typeof Profile
    ) {}

    async getProfile(userId: number): Promise<Profile> {
        const profile = await this.profileRepository.findOne({
            where: { userId: Number(userId) },
            include: [{
                model: User,
                attributes: ['id', 'nickname']
            }]
        });

        if (!profile) {
            throw new NotFoundException('Profile not found');
        }

        return profile;
    }

    async updateProfile(userId: number, dto: UpdateProfileDto): Promise<Profile> {
        const [affectedCount] = await this.profileRepository.update(dto, {
            where: { userId },
            returning: true
        });

        if (affectedCount === 0) {
            throw new NotFoundException('Profile not found');
        }

        return this.getProfile(userId);
    }

    async createProfile(userId: number): Promise<Profile> {
        return this.profileRepository.create({ userId });
    }
}