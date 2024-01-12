import { User, UserCreationAttributes } from "../models/Users.js"

export const userService = {
    findUserByEmail: async(email: string) =>{
        const user = await User.findOne({
            where:{email}
        })
        return user
    },
    createUser: async (attributes: UserCreationAttributes)=>{
        const user = await User.create(attributes)
        return user
    }
}