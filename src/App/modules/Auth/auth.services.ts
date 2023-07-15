import {IUser} from "@/App/modules/User/user.types";
import {UserModel} from "@/App/modules/User/user.model";
import CustomError from "@/Utils/errors/customErrror.class";
import {HashHelper} from "@/Utils/helper/hashHelper";
import {generateToken} from "@/Utils/helper/generateToken";

const CreateNewAccount = async (data: IUser): Promise<IUser> => {
    const newUser: IUser = await UserModel.create(data)
    return newUser
}
const logIntoAccount = async (data: Partial<IUser>) => {
    const user: IUser | null = await UserModel.findOne({email: data.email})

    const validPassword = user && await HashHelper.comparePassword(data.password as string, user.password)
    if (!validPassword) throw new CustomError('Invalid email or password', 401)

    const tokenData = {
        id: user._id,
        role: user.role
    }
    const accessToken = generateToken.accessToken(tokenData)
    const refreshToken = generateToken.refreshToken(tokenData)

    return {
        accessToken,
        refreshToken
    }
}


export const AuthServices = {
    CreateNewAccount,
    logIntoAccount
}