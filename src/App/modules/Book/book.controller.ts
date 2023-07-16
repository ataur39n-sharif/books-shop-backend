import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";

const GetAllBooks = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})

const GetOwnBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})

const AddNewBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

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