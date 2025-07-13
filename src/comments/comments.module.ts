import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './comments.model';
import { AuthModule } from '../auth/auth.module';
import { Post } from 'src/posts/posts.model';
import { User } from 'src/users/users.model';

@Module({
    providers: [CommentsService],
    controllers: [CommentsController],
    imports: [SequelizeModule.forFeature([Comment, Post, User]), AuthModule],
})
export class CommentsModule {}