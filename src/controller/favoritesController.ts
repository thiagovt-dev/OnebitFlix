import { Response } from "express";
import { AuthorizationRequest } from "../middlewares/auth.js";
import { favoriteService } from "../services/favoriteService.js";

export const favoritesController = {
  save: async (req: AuthorizationRequest, res: Response) => {
    const userId = req.user!.id;
    const { courseId } = req.body;

    try {
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
};