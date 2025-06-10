import {Column, DataType, Model, Table} from "sequelize-typescript";

interface AuthAttrs {
    nickname: string;
    login: string;
    password: string;
}

@Table({tableName: 'Users'})
export class User extends Model<User, AuthAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    nickname: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;
}