import {Router} from "express";
import {AuthController} from "@/App/modules/Auth/auth.controller";
import {AuthMiddleware} from "@/App/modules/Auth/auth.middlewares";

const AuthRoutes = Router()

AuthRoutes
    .post('/register', AuthController.singUp)
    .post('/login', AuthMiddleware.userExists, AuthController.login)


export default AuthRoutes