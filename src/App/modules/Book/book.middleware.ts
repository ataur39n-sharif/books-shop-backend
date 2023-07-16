import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {BookValidator} from "@/App/modules/Book/book.validation";
import config from "@/Config";
import jwt from "jsonwebtoken";
import {CustomJwtPayload} from "@/Utils/types/jwtHelper.type";

const validateAccess = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization
    const validateData = BookValidator.accessValidation.parse({accessToken})
    const data = jwt.verify(validateData.accessToken.split(" ")[1], String(config.jwt.accessToken.secret))
    req.body.uid = (data as CustomJwtPayload).id
    req.body.email = (data as CustomJwtPayload).email

    next()
})

export const BookMiddleware = {
    validateAccess
}