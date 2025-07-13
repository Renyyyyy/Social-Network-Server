import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsService } from "./posts.service";
import { Post as PostModel } from "./posts.model";
import { User } from "src/users/users.model";
import { DeletePostDto } from "./dto/delete-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("posts")
export class PostsController {
  constructor(private postService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() dto: CreatePostDto,
    @Req() req: Request & { user: User }
  ): Promise<PostModel> {
    return this.postService.create(dto, req.user);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() dto: UpdatePostDto,
    @Req() req: Request & { user: User }
  ): Promise<void> {
    await this.postService.update(dto, req.user);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async delete(
    @Param("id") id: number,
    @Req() req: Request & { user: User }
  ): Promise<void> {
    await this.postService.delete(id, req.user);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getPostById(@Param("id") id: number): Promise<PostModel> {
    return this.postService.getPostById(id);
  }

  @Get("user/:userId")
  @UseGuards(JwtAuthGuard)
  async getPostsByUserId(
    @Param("userId") userId: number
  ): Promise<PostModel[]> {
    return this.postService.getPostsByUserId(userId);
  }

  @Get("user/:userId/paginated")
  @UseGuards(JwtAuthGuard)
  async getPaginatedUserPosts(
    @Param("userId") userId: number,
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ): Promise<{ posts: PostModel[]; totalCount: number }> {
    return this.postService.getPaginatedUserPosts(userId, page, limit);
  }
}
