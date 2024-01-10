import { Category } from "../models/Category.js";

const categoryService = {
  findAllPaginated: async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage;
    const { count, rows } = await Category.findAndCountAll({
      attributes: ["id", "name", "position"],
      order: [["position", "ASC"]],
      limit: perPage,
      offset,
    });

    return {
      categories: rows,
      page,
      perPage,
      total: count,
    };
  },
  findByIdWithCourses: async (id: string) => {
    const categoryWithCourse = await Category.findByPk(id, {
      attributes: ["id", ["name", "Categoria"]],
      include: {
        association: "courses",
        attributes: [
          "id",
          ["name", "Curso"],
          ["synopsis", "Resumo"],
          ["thumbnail_url", "thumbnailUrl"],
        ],
      },
    });

    return categoryWithCourse;
  },
};

export default categoryService;
