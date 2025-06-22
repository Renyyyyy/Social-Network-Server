import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { User } from "src/users/users.model";

interface LikeCreationAttrs {
    userId: number;
    postId: number;
}

@Table({ tableName: 'Likes'})
export class Like extends Model<Like, LikeCreationAttrs>{

    //@ts-ignore
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true }) id: number;
    
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => Post)
    @Column({ type: DataType.INTEGER, allowNull: false })
    postId: number;

    @BelongsTo(() => Post)
    post: Post;
}