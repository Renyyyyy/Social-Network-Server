import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface FollowerCreationAttrs {
    content: string;
    userId: number;
    followerId: number;
}

@Table({ tableName: 'Followers' })
export class Follower extends Model<Follower, FollowerCreationAttrs>{

    //@ts-ignore
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true }) id: number;
    
    @Column({ type: DataType.INTEGER, allowNull: false })
    followerId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    // TODO how to remove password 
    @BelongsTo(() => User)
    user: User;
}