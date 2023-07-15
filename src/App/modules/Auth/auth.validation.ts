import {z, ZodType} from "zod";
import {IUser} from "@/App/modules/User/user.types";

const singUp: ZodType<IUser> = z.object({
    name: z.object({
        firstName: z.string(),
        lastName: z.string(),
    }),
    email: z.string().email(),
    password: z.string()
})

const singIn: ZodType<Partial<IUser>> = z.object({
    email: z.string().email(),
    password: z.string()
})

export const AuthValidation = {
    singUp,
    singIn
}