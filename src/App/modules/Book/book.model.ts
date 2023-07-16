import {model, Schema} from "mongoose";
import {IBook} from "@/App/modules/Book/book.types";

const dataSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true

    },
    author: {
        type: String,
        required: true
    },
    genre: {type: String, required: true},
    publicationDate: {type: Date, required: true},
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

const BookModel = model<IBook>('book', dataSchema)

export default BookModel