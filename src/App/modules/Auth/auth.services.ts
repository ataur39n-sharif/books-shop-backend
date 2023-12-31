import {IAuthWithName} from './auth.validation';
import CustomError from "@/Utils/errors/customErrror.class";
import {HashHelper} from "@/Utils/helper/hashHelper";
import {generateToken} from "@/Utils/helper/generateToken";
import {IAuthProperty} from "./auth.types";
import {AuthModel} from "./auth.model";
import {UserModel} from '../User/user.model';
import mongoose from 'mongoose';

const CreateNewAccount = async (data: IAuthWithName): Promise<IAuthProperty> => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const exist = await UserModel.findOne({email: data.email}).session(session)
        if (exist) throw new CustomError(`User ${data.email} already exists`, 400)

        const userData = new UserModel({
            email: data.email,
            name: data.name
        })
        await userData.save({session})

        const newUser = new AuthModel({
            email: data.email,
            password: data.password,
            uid: userData._id
        })
        await newUser.save({session})
        await session.commitTransaction()

        return newUser
    } catch (error) {
        await session.abortTransaction()
        throw error
    }
}
const logIntoAccount = async (data: Partial<IAuthProperty>) => {
    const user: IAuthProperty | null = await AuthModel.findOne({email: data.email})

    const validPassword = user && await HashHelper.comparePassword(data.password as string, user.password)
    if (!validPassword) throw new CustomError('Invalid email or password', 401)

    const tokenData = {
        id: user?.uid,
        email: user.email
    }
    const accessToken = generateToken.accessToken(tokenData)
    const refreshToken = generateToken.refreshToken(tokenData)

    return {
        accessToken,
        refreshToken,
        email: user?.email,
        id: user?.uid
    }
}


export const AuthServices = {
    CreateNewAccount,
    logIntoAccount
}