import { PageContext } from "adminjs";
import { Course } from "../../models/Courses.js";
import { Episode } from "../../models/Episode.js";
import { Category } from "../../models/Category.js";
import { User } from "../../models/Users.js";

export type DashboardDataTypes = {
    courses: number;
    episodes: number;
    categories: number;
    commonUser: number;
};

export const dashboardHandler = async (
  req: any,
  res: any,
  context: PageContext
): Promise<void> => {
  const [courses, episodes, categories, commonUser] = await Promise.all([
    Course.count(),
    Episode.count(),
    Category.count(),
    User.count({ where: { role: "user" } }),
  ]);
  const resourceCount: DashboardDataTypes = {
    courses,
    episodes,
    categories,
    commonUser,
  };
  res.json({
    Cursos: resourceCount.courses,
    Episódios: resourceCount.episodes,
    Categorias: resourceCount.categories,
    Usuários: resourceCount.commonUser,
  });

};
