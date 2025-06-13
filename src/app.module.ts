import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import {User} from "./users/users.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/posts.model';

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
      models: [User, Post],
      autoLoadModels: true,
      logging: false
    }),
    HealthModule,
    UsersModule,
    AuthModule,
    PostsModule
  ],
})
export class AppModule {}