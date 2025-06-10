import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import {User} from "./users/users.model";

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
      models: [User],
      autoLoadModels: true,
      logging: false
    }),
    HealthModule,
    AuthModule,
  ],
})
export class AppModule {}