import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.model';
import { Like } from './likes.model';
import { Post } from 'src/posts/posts.model';

@Module({
  providers: [LikesService],
  controllers: [LikesController],
  imports: [SequelizeModule.forFeature([Like, Post, User]), AuthModule],
})
export class LikesModule {}
