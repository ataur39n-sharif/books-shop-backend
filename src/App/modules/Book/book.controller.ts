import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {pickFunction} from "@/Utils/helper/pickFunction";
import BookModel from "@/App/modules/Book/book.model";
import {BookValidator} from "@/App/modules/Book/book.validation";
import {BookService} from "@/App/modules/Book/book.services";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {MongoHelper} from "@/Utils/helper/mongoHelper";

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
        id
    } = pickFunction(req.body, [...Object.keys(BookModel.schema.obj), "id"])

    const validateData = BookValidator.newBookSchema.parse({
        title, author, genre,
        publicationDate: new Date(publicationDate),
        ownerId: MongoHelper.convertToObjectId({id}).id
    })
    const book = await BookService.addNew(validateData)
    sendResponse.success(res, {
        data: book,
        message: 'successfully added new book',
        statusCode: 201
    })
})
const EditBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

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