import { Favorite } from "../models/Favorite.js";

export const favoriteService = {
  create: async (userId: number, courseId: number) => {
    const favorite = Favorite.create({
      userId,
      courseId,
    });
    return favorite;
  },
  findByUserId: async (userId: number) => {
    const favorites = await Favorite.findAll({
      attributes: [["user_id", "userId"]],
      where: { userId: userId },
      include: {
        association: "Course",
        attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      },
    });
    return {
      userId,
      courses: favorites.map((favorite) => favorite.Course),
    };
  },

  delete: async (userId: number, courseId: number) => {
    const favorite = Favorite.destroy({
      where: { userId, courseId },
    });
    return favorite;
  },

};
