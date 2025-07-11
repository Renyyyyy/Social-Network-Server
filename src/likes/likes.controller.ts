import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { User } from "src/users/users.model";
import { LikeDto } from "./dto/like.dto";
import { LikesService } from "./likes.service";
import { Like } from "./likes.model";

@Controller("likes")
export class LikesController {
  constructor(private likeService: LikesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createLike(@Body() dto: LikeDto, @Req() req: Request & { user: User }) {
    return this.likeService.create(dto, req.user);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  deleteLike(@Param("id") id: number, @Req() req: Request & { user: User }) {
    return this.likeService.deleteLike(id, req.user);
  }

  @Get("post/:postId")
  getLikesByPostId(@Param("postId") postId: number) {
    return this.likeService.getLikesByPostId(postId);
  }
}
