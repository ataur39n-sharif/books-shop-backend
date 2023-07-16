import {Types} from "mongoose";

export interface IBook {
    title: string;
    author: string;
    genre: string;
    publicationDate: Date;
    ownerId: Types.ObjectId;
}
