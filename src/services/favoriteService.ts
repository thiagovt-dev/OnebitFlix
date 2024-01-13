import { Favorite } from "../models/Favorite.js"

export const favoriteService = {
    create: async (userId: number, courseId: number)=>{
        const favorite = Favorite.create({
            userId,
            courseId
        })
        return favorite
    }
}