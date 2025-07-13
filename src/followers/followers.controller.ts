import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { FollowersService } from "./followers.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { User } from "src/users/users.model";
import { FollowerDto } from "./dto/follower.dto";
import { Follower } from "./followers.model";

@Controller("followers")
export class FollowersController {
  constructor(private followerService: FollowersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() dto: FollowerDto,
    @Req() req: Request & { user: User }
  ): Promise<Follower | { message: string }> {
    return this.followerService.create(dto, req.user);
  }

  @Delete(":followerId")
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async delete(
    @Param("followerId") followerId: number,
    @Req() req: Request & { user: User }
  ): Promise<void> {
    await this.followerService.delete(followerId, req.user);
  }

  @Get(":userId/followers")
  @UseGuards(JwtAuthGuard)
  async getFollowers(@Param("userId") userId: number): Promise<User[]> {
    return this.followerService.getFollowers(userId);
  }

  @Get(":userId/following")
  @UseGuards(JwtAuthGuard)
  async getFollowing(@Param("userId") userId: number): Promise<User[]> {
    return this.followerService.getFollowing(userId);
  }
}
