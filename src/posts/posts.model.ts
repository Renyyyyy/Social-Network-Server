import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Comment } from "src/comments/comments.model";
import { Like } from "src/likes/likes.model";

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
}

@Table({tableName: 'Posts'})
export class Post extends Model<Post, PostCreationAttrs>{
    
    //@ts-ignore
    @Column({type: DataType.INTEGER,primaryKey: true,autoIncrement: true,unique: true})id: number;
    
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
    
    @BelongsTo(() => User)
    author: User;

    @HasMany(() => Comment)
    comments: Comment[];

    @HasMany(() => Like)
    likes: Like[];
}