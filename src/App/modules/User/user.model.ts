import {model, Schema} from "mongoose";
import {IUser, IUserModel} from "@/App/modules/User/user.types";
import {HashHelper} from "@/Utils/helper/hashHelper";
import {NameSchema} from "@/Utils/schema/name.schema";

const dataSchema = new Schema<IUser, IUserModel>({
    name: {
        type: NameSchema,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: async (value: string): Promise<boolean> => {
                const result = await UserModel.countDocuments({email: value})
                return result === 0
            },
            message: "Email must be unique.",

        }

    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
})

dataSchema.pre('save', async function (next) {
    const hash = await HashHelper.generateHashPassword(this.password)
    this.password = hash
    next()
})

dataSchema.static("isUserExist", async function (
    key: keyof IUser,
    value: string | number | boolean
): Promise<boolean> {
    const user: IUser | null = await UserModel.findOne({[key]: value})
    return !!user
})

export const UserModel = model<IUser, IUserModel>('user', dataSchema)