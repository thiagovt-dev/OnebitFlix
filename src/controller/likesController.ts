import { Course } from "../models/Courses.js";
import { AuthorizationRequest } from "../middlewares/auth.js";
import { likeService } from "../services/likeService.js";
import { Response } from "express";

export const likesController = {
  save: async (req: AuthorizationRequest, res: Response) => {
    const userId = req.user!.id;
    const { courseId } = req.body;

    try {
      const course = await Course.findOne({ where: { id: courseId } });
      if (!course) throw new Error("This course not exits");
      const like = await likeService.create(userId, Number(courseId));
      return res.status(201).json({ like });
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
      const course = await Course.findOne({ where: { id: courseId } });
      if (!course) throw new Error("This course not exits");
      const like = await likeService.delete(userId, Number(courseId));
      return res.status(201).json({ message: "Unlike" });
    } catch (err) {
      if (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message });
        }
      }
    }
  },
};
