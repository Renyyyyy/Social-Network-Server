import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCommDto } from "./dto/create-com.dto";
import { Comment } from "./comments.model";
import { UpdateCommDto } from "./dto/update-com.dto";
import { DeleteCommDto } from "./dto/delete-com.dto";
import { User } from "src/users/users.model";

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment
  ) {}

  async create(dto: CreateCommDto, user: User): Promise<Comment> {
    const comment = await this.commentRepository.create({
      ...dto,
      userId: user.id,
    });

    return this.commentRepository.findByPk(comment.get("id"), {
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
  }

  async update(dto: UpdateCommDto, user: User): Promise<Comment> {
    const comment = await this.commentRepository.findByPk(dto.id);

    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    if (comment.get("userId") !== user.id) {
      throw new ForbiddenException("You may only update your own comments");
    }

    await comment.update({ content: dto.content });

    return this.commentRepository.findByPk(comment.id, {
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
  }

  async delete(commentId: number, user: User): Promise<void> {
    const comment = await this.commentRepository.findByPk(commentId);

    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    if (comment.get("userId") !== user.id) {
      throw new ForbiddenException("You may only delete your own comments");
    }

    await comment.destroy();
  }

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return this.commentRepository.findAll({
      where: { postId },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
  }

  async getAllComments(offset = 0, limit = 10): Promise<Comment[]> {
    const comms = await this.commentRepository.findAll({
      include: { all: true },
      offset: offset,
      limit: limit,
    });
    return comms; /*.map(comms => {
            delete comms.author.password;
            return comms
        });*/
  }
}
