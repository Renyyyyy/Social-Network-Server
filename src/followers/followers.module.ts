import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.model';
import { Follower } from './followers.model';

@Module({
  providers: [FollowersService],
  controllers: [FollowersController],
  imports: [SequelizeModule.forFeature([Follower,User]), AuthModule],
})
export class FollowersModule {}
