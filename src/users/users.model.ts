import { ApiProperty } from "@nestjs/swagger";
import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import { Post } from "src/posts/posts.model";

interface IUser {
    login: string;
    nickname: string;
    password: string;
}

@Table({tableName: 'Users'})
export class User extends Model<User, IUser>{
    @ApiProperty({example: '1', description: 'Unique identificator'})
    //@ts-ignore
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true}) id: number;
    
    @ApiProperty({example: 'Mike', description: 'Name'})
    @Column({type: DataType.STRING,unique: false, allowNull: false})
    nickname: string;

    @ApiProperty({example: 'Mike1900', description: 'Login'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login: string;

    @ApiProperty({example: 'verystrongpassword', description: 'Password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @HasMany(() => Post)
    posts: Post[];
}