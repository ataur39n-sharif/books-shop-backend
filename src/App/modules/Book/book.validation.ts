import {z, ZodType} from "zod";
import {IBook} from "@/App/modules/Book/book.types";
import {Types} from "mongoose";

const newBookSchema: ZodType<IBook> = z.object({
    title: z.string(),
    author: z.string(),
    genre: z.string(),
    publicationDate: z.date(),
    ownerId: z.instanceof(Types.ObjectId)
})

const updateBookSchema: ZodType<Partial<IBook>> = z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    publicationDate: z.date().optional()
})

const accessValidation = z.object({
    accessToken: z.string()
})

export const BookValidator = {
    newBookSchema,
    updateBookSchema,
    accessValidation
}