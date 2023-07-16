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

export const BookService = {
    addNew,
    updateBook
}