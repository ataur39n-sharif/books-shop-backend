import {Router} from "express";
import {BookController} from "@/App/modules/Book/book.controller";
import {BookMiddleware} from "@/App/modules/Book/book.middleware";

const BookRoutes = Router()

BookRoutes
    .post('/',
        BookMiddleware.validateAccess,
        BookController.AddNewBook
    )
    .patch('/:id',
        BookMiddleware.validateAccess,
        BookMiddleware.validateOwner,
        BookController.EditBook
    )
    .delete('/:id',
        BookMiddleware.validateAccess,
        BookMiddleware.validateOwner,
        BookController.DeleteBook
    )

export default BookRoutes