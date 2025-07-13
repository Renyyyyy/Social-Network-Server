import {
  Body,
  Controller,
  Post,
  Delete,
  Put,
  Req,
  UseGuards,
  Get,
  HttpCode,
  Param,
} from "@nestjs/common";
import { CreateCommDto } from "./dto/create-com.dto";
import { UpdateCommDto } from "./dto/update-com.dto";
import { DeleteCommDto } from "./dto/delete-com.dto";
import { CommentsService } from "./comments.service";
import { Comment } from "./comments.model";
import { User } from "src/users/users.model";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("comments")
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() dto: CreateCommDto,
    @Req() req: Request & { user: User }
  ): Promise<Comment> {
    return this.commentsService.create(dto, req.user);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() dto: UpdateCommDto,
    @Req() req: Request & { user: User }
  ): Promise<Comment> {
    return this.commentsService.update(dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @HttpCode(204)
  async delete(
    @Param("id") id: number,
    @Req() req: Request & { user: User }
  ): Promise<void> {
    await this.commentsService.delete(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Promise<Comment[]> {
    return this.commentsService.getAllComments();
  }
}
