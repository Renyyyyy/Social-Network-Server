import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./posts.model";
import { CreatePostDto } from "./dto/create-post.dto";
import { User } from "src/users/users.model";
import { DeletePostDto } from "./dto/delete-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Like } from "src/likes/likes.model";
import { Comment } from "src/comments/comments.model";

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async create(dto: CreatePostDto, user: User): Promise<Post> {
    const post = await this.postRepository.create({ ...dto, userId: user.id });
    return post;
  }

  async update(dto: UpdatePostDto, user: User): Promise<void> {
    const post = await this.postRepository.findByPk(dto.id);

    if (!post) {
      throw new NotFoundException("Post not found");
    }

    if (post.get("userId") !== user.id) {
      throw new ForbiddenException("You may only update your own posts");
    }

    await post.update({
      title: dto.title,
      content: dto.content,
    });
  }

  async delete(id: number, user: User): Promise<void> {
    const post = await this.postRepository.findByPk(id);

    if (!post) {
      throw new NotFoundException("Post not found");
    }

    if (post.get("userId") !== user.id) {
      throw new ForbiddenException("You may only delete your own posts");
    }

    await post.destroy();
  }

  async getPostById(id: number): Promise<Post> {
    console.log(id);
    return this.postRepository.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "nickname", "login"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: Like,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
      ],
    });
  }

  async getPostsByUserId(userId: number): Promise<Post[]> {
    return this.postRepository.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ["id", "nickname", "login"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: Like,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
      ],
    });
  }

  async getPaginatedUserPosts(
    userId: number,
    page: number,
    limit: number
  ): Promise<{ posts: Post[]; totalCount: number }> {
    const offset = (page - 1) * limit;

    const { count, rows } = await this.postRepository.findAndCountAll({
      where: { userId },
      limit,
      offset,
      order: [["id", "DESC"]],
      include: [
        { model: User, attributes: ["id", "nickname", "login"] },
        { model: Comment, include: [User] },
        { model: Like, include: [User] },
      ],
    });

    return {
      posts: rows,
      totalCount: count,
    };
  }
}
