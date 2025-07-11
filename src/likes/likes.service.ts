import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/users/users.model";
import { LikeDto } from "./dto/like.dto";
import { Like } from "./likes.model";

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like) private likeRepository: typeof Like) {}

  async create(dto: LikeDto, user: User): Promise<Like> {
    return this.likeRepository.create({ ...dto, userId: user.id });
  }

  async deleteLike(likeId: number, user: User): Promise<void> {
    const like = await this.likeRepository.findByPk(likeId);

    if (!like) {
      throw new NotFoundException("Like not found");
    }

    if (like.userId !== user.id) {
      throw new ForbiddenException("You may only delete your own likes");
    }

    await like.destroy();
  }

  async getLikesByPostId(postId: number): Promise<Like[]> {
    return this.likeRepository.findAll({ where: { postId } });
  }
}
