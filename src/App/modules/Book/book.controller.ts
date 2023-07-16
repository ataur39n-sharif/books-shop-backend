import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {pickFunction} from "@/Utils/helper/pickFunction";
import BookModel from "@/App/modules/Book/book.model";
import {BookValidator} from "@/App/modules/Book/book.validation";
import {BookService} from "@/App/modules/Book/book.services";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {MongoHelper} from "@/Utils/helper/mongoHelper";
import {IBook} from "@/App/modules/Book/book.types";

const GetAllBooks = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})

const GetOwnBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})

const AddNewBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {
        title,
        author,
        publicationDate,
        genre,
        uid
    } = pickFunction(req.body, [...Object.keys(BookModel.schema.obj), "uid"])


    const validateData = BookValidator.newBookSchema.parse({
        title, author, genre,
        publicationDate: new Date(publicationDate),
        ownerId: uid && MongoHelper.convertToObjectId({uid}).uid
    })

    console.log(validateData)

    const book = await BookService.addNew(validateData)
    sendResponse.success(res, {
        data: book,
        message: 'successfully added new book',
        statusCode: 201
    })
})
const EditBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const book_id = req.body.book_id
    const data: Partial<IBook> = pickFunction(req.body, ["title", "author", "publicationDate", "genre"])
    
    const book = await BookService.updateBook(book_id, data)

    sendResponse.success(res, {
        data: book,
        message: 'successfully updated',
        statusCode: 200
    })

})

const DeleteBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})

export const BookController = {
    GetOwnBook,
    GetAllBooks,
    AddNewBook,
    EditBook,
    DeleteBook
}