import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {BookValidator} from "@/App/modules/Book/book.validation";
import config from "@/Config";
import jwt from "jsonwebtoken";
import {CustomJwtPayload} from "@/Utils/types/jwtHelper.type";
import {z} from "zod";
import BookModel from "@/App/modules/Book/book.model";
import {IBook} from "@/App/modules/Book/book.types";
import CustomError from "@/Utils/errors/customErrror.class";
import {MongoHelper} from "@/Utils/helper/mongoHelper";

const validateAccess = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization
    const validateData = BookValidator.accessValidation.parse({accessToken})
    const data = jwt.verify(validateData.accessToken.split(" ")[1], String(config.jwt.accessToken.secret))
    req.body.uid = (data as CustomJwtPayload).id
    req.body.email = (data as CustomJwtPayload).email

    next()
})

const validateOwner = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization
    const book_id = z.string().parse(req.params.id)
    const validateData = BookValidator.accessValidation.parse({accessToken})
    const verifyData = jwt.verify(validateData.accessToken.split(" ")[1], String(config.jwt.accessToken.secret))
    const book: IBook | null = await BookModel.findOne({_id: book_id})

    if (book && (book.ownerId.equals(MongoHelper.convertToObjectId({id: (verifyData as CustomJwtPayload).id}).id))) {
        req.body.book_id = book._id
        next()
    } else {
        throw new CustomError('Invalid request', 400)
    }
})

export const BookMiddleware = {
    validateAccess,
    validateOwner
}