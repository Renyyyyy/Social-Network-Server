import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import {User} from "./users/users.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/posts.model';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comments.model';
import { LikesModule } from './likes/likes.module';
import { FollowersModule } from './followers/followers.module';
import { Like } from './likes/likes.model';
import { Follower } from './followers/followers.model';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/profile.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
        envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [User, Post, Comment, Like, Follower, Profile],
      autoLoadModels: true,
      synchronize: true,
      logging: false
    }),
    HealthModule,
    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    FollowersModule,
    ProfileModule
  ],
})
export class AppModule {}