import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { User } from "src/users/users.model";

interface CommCreationAttrs {
    content: string;
    userId: number;
    postId: number;
}

@Table({ tableName: 'Comments' })
export class Comment extends Model<Comment, CommCreationAttrs>{

    //@ts-ignore
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true }) id: number;

    @Column({ type: DataType.STRING, allowNull: false }) 
    content: string;
    
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @BelongsTo(() => User)
    author: User;

    @ForeignKey(() => Post)
    @Column({ type: DataType.INTEGER, allowNull: false })
    postId: number;

    @BelongsTo(() => Post)
    post: Post;
}