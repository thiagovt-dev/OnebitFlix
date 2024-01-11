import { Request, Response } from "express";
import courseService from "../services/coursesService.js";
import getPaginationParams from "../helpers/getPaginationParams.js";

export const coursesController = {
  featured: async (req: Request, res: Response) => {
    try {
      const featuredCourses = await courseService.getRandomFeaturedCourses();
      return res.json(featuredCourses);
    } catch (err) {
      if (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message });
        }
      }
    }
  },
  show: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const course = await courseService.findByIdWithEpisodes(id);
      return res.json(course);
    } catch (err) {
      if (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message });
        }
      }
    }
  },
  newest: async (req: Request, res: Response) => {
    try {
      const newest = await courseService.getNewestCourse();
      return res.json(newest);
    } catch (err) {
      if (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message });
        }
      }
    }
  },
  search: async (req: Request, res: Response) => {
    const { name } = req.query;
    const [page, perPage] = getPaginationParams(req.query)
    try {
      if(typeof name !== 'string') throw new Error('name param must be of type string')
      const searchCourse = await courseService.findByName(name, page, perPage);
      return res.json(searchCourse);
    } catch (err) {
      if (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message });
        }
      }
    }
  },
};
