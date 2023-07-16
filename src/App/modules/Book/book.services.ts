import {IBook} from "@/App/modules/Book/book.types";
import BookModel from "@/App/modules/Book/book.model";
import {Types} from "mongoose";
import {IQueryItems} from "@/Utils/types/query.type";
import {calculatePagination, manageSorting, MongoQueryHelper} from "@/Utils/helper/queryOptimize";

const getBooks = async (
    payload: IQueryItems<IBook>
): Promise<IBook[]> => {
    const {filter, sort, pagination, search} = payload
    const searchQ = search.search
    const {page, limit, skip} = calculatePagination(pagination)
    const {sortBy, sortOrder} = manageSorting(sort)
    const conditions: any[] = []
    const fields = Object.entries(BookModel.schema.obj)

    //search query
    if (searchQ) {
        conditions.push({
            $or: fields.map(field => {
                const fieldType = BookModel.schema.path(field[0]).instance //mongoose schema data type
                // const fieldType = typeof CowModel.schema.path(field[0]).options.type(); // Js data type
                return MongoQueryHelper(fieldType, field[0], searchQ)
            })
        })
    }
    //filter query
    if (Object.entries(filter).length > 0) {
        conditions.push({
            $and: Object.entries(filter).map(([key, value]) => {
                const fieldType = BookModel.schema.path(key).instance
                return MongoQueryHelper(fieldType, key, value as string)
            })
        })
    }

    const query = conditions.length ? conditions : {}
    const books: IBook[] = await BookModel.find(query)
        .sort({[sortBy]: sortOrder})
        .skip(skip)
        .limit(limit)

    return books
}

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
    getBooks,
    addNew,
    updateBook,
    deleteBook
}