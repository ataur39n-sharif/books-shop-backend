import {Model} from "mongoose";

export enum ERole {
    superAdmin = "superAdmin",
    admin = "admin",
    user = "user",
}

export type TName = {
    firstName: string
    lastName: string
}

export interface IUser {
    _id?: string
    name: TName,
    email: string
    password: string
    image?: string
    role?: ERole
    createdAt?: string
    updatedAt?: string
}

export interface IUserModel extends Model<IUser> {
    isUserExist(key: keyof IUser, value: string | number | boolean): Promise<boolean>;
}