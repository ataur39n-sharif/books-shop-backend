import {Router} from "express";
import AuthRoutes from "@/App/modules/Auth/auth.routes";
import BookRoutes from "@/App/modules/Book/book.routes";

const rootRouter = Router()

rootRouter
    .use('/auth', AuthRoutes)
    .use('/books', BookRoutes)
export default rootRouter