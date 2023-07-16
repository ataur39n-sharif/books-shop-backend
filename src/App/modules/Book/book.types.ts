import {Types} from "mongoose";

export interface IBook {
    _id?: Types.ObjectId;
    title: string;
    author: string;
    genre: string;
    publicationDate: Date;
    ownerId: Types.ObjectId
    createdAt?: string
    updatedAt?: string
}
