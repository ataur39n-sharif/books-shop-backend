import {IBook} from "@/App/modules/Book/book.types";
import BookModel from "@/App/modules/Book/book.model";

const addNew = async (data: IBook): Promise<IBook> => {
    const newBook: IBook = await BookModel.create(data)
    return newBook
}

export const BookService = {
    addNew
}