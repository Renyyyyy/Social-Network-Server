import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/users.model";

interface FollowerCreationAttrs {
  userId: number;
  followerId: number;
}

@Table({
  tableName: "Followers",
  indexes: [
    {
      unique: true,
      fields: ["userId", "followerId"],
    },
  ],
})
export class Follower extends Model<Follower, FollowerCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  }) //@ts-ignore
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  followerId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User, { foreignKey: "userId", as: "user" })
  user: User;

  @BelongsTo(() => User, { foreignKey: "followerId", as: "follower" })
  follower: User;
}
