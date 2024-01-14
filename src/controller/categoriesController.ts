import { Request, Response } from "express";
import { Category } from "../models/Category.js";
import getPaginationParams from "../helpers/getPaginationParams.js";
import categoryService from "../services/categoryService.js";

const categoriesController = {
  index: async (req: Request, res: Response) => {
    const [page, perPage] = getPaginationParams(req.query);
    try {
      const paginatedCategories = await categoryService.findAllPaginated(
        page,
        perPage
      );
      return res.json(paginatedCategories);
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
      const category = await categoryService.findByIdWithCourses(id);
      return res.status(201).json(category);
    } catch (err) {
      if (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message });
        }
      }
    }
  },
};

export default categoriesController;
