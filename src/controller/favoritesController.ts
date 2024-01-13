import { Response } from "express";
import { AuthorizationRequest } from "../middlewares/auth.js";
import { favoriteService } from "../services/favoriteService.js";
import { Course } from "../models/Courses.js";

export const favoritesController = {
  index: async (req: AuthorizationRequest, res: Response) => {
    const userId = req.user!.id;
    try {
      const favorite = await favoriteService.findByUserId(userId);
      return res.status(201).json(favorite);
    } catch (err) {
      if (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message });
        }
      }
    }
  },

  save: async (req: AuthorizationRequest, res: Response) => {
    const userId = req.user!.id;
    const { courseId } = req.body;

    try {
      const course = await Course.findOne({ where: { id: courseId } });
      if (!course) throw new Error("This course not exits");
      const favorite = await favoriteService.create(userId, Number(courseId));
      return res.status(201).json({ favorite });
    } catch (err) {
      if (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message });
        }
      }
    }
  },
  delete: async (req: AuthorizationRequest, res: Response) => {
    const userId = req.user!.id;
    const { courseId } = req.body;
    try {
      const course = await Course.findOne({where:{id: courseId}})
      if(!course) throw new Error ('This course not exits')
      const favorite = await favoriteService.delete(userId, Number(courseId));
      return res.status(201).json({message: 'Removed from favorites'});
    } catch (err) {
      if (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message });
        }
      }
    }
  },
};
