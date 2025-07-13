import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Follower } from "./followers.model";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/users/users.model";
import { FollowerDto } from "./dto/follower.dto";

@Injectable()
export class FollowersService {
  constructor(
    @InjectModel(Follower) private followerRepository: typeof Follower,
    @InjectModel(User) private userRepository: typeof User
  ) {}

  async create(dto: FollowerDto, user: User): Promise<Follower> {
    const userToFollow = await this.userRepository.findByPk(dto.followerId);
    if (!userToFollow) {
      throw new NotFoundException("User to follow not found");
    }

    if (dto.followerId === user.id) {
      throw new BadRequestException("You cannot follow yourself");
    }

    const followerCheck = await this.followerRepository.findOne({
      where: { followerId: user.id, userId: dto.followerId },
    });

    if (followerCheck) {
      throw new ConflictException("You are already following this user");
    }

    return await this.followerRepository.create({
      userId: dto.followerId,
      followerId: user.id,
    });
  }

  async delete(followerId: number, user: User): Promise<void> {
    const follower = await this.followerRepository.findOne({
      where: { userId: followerId, followerId: user.id },
    });
    if (!follower) {
      throw new NotFoundException("Subscription not found");
    }

    await follower.destroy();
  }

  async getFollowers(userId: number): Promise<User[]> {
    const followers = await this.followerRepository.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: "follower",
          attributes: ["id", "nickname", "login"],
        },
      ],
    });

    return followers.map((f) => f.get("follower"));
  }

  async getFollowing(userId: number): Promise<User[]> {
    const following = await this.followerRepository.findAll({
      where: { followerId: userId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "nickname", "login"],
        },
      ],
    });

    return following.map((f) => f.get("user"));
  }
}
