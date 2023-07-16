import {IBook} from "@/App/modules/Book/book.types";
import BookModel from "@/App/modules/Book/book.model";
import {Types} from "mongoose";

const addNew = async (data: IBook): Promise<IBook> => {
    const newBook: IBook = await BookModel.create(data)
    return newBook
}

const updateBook = async (id: Types.ObjectId, data: Partial<IBook>) => {
    const updateBook: IBook | null = await BookModel.findOneAndUpdate({_id: id}, data, {
        new: true
    })
    return updateBook
}

const deleteBook = async (id: Types.ObjectId): Promise<boolean> => {
    const book = await BookModel.deleteOne({_id: id}, {
        new: true
    })
    return book.deletedCount > 0
}

export const BookService = {
    addNew,
    updateBook,
    deleteBook
}