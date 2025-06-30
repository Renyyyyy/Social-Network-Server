import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import { User } from "src/users/users.model";

interface ProfileCreationAttrs {
    about: string;
    userId: number;
}

@Table({tableName: 'Profiles'})
export class Profile extends Model<Profile, ProfileCreationAttrs>{
    
    //@ts-ignore
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true}) id: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false, defaultValue: ""})
    about: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
    
    @BelongsTo(() => User)
    user: User;
}