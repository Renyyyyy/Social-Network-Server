import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { User } from "src/users/users.model";

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
}

@Table({tableName: 'Posts'})
export class Post extends Model<Post, PostCreationAttrs>{
    
    //@ts-ignore
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true}) id: number;
    
    @Column({type: DataType.STRING,unique: false, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    content: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User;
}