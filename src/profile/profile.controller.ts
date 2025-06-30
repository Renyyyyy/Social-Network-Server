import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/users.model';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profile.model';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getProfile(@Req() req: Request & { user: User }): Promise<Profile> {
        return this.profileService.getProfile(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateProfile(
        @Body() dto: UpdateProfileDto,
        @Req() req: Request & { user: User }
    ): Promise<Profile> {
        return this.profileService.updateProfile(req.user.id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createProfile(@Req() req: Request & { user: User }): Promise<Profile> {
        return this.profileService.createProfile(req.user.id);
    }
}