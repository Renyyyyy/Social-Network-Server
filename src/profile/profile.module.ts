import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { Profile } from './profile.model';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [
    SequelizeModule.forFeature([Profile]),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule), 
  ],
  exports: [ProfileService]
})
export class ProfileModule {}