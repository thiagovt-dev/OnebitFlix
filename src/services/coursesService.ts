import { Op } from "sequelize";
import { Course } from "../models/Courses.js";

const courseService = {
  findByIdWithEpisodes: async (id: string) => {
    const courseWithEpisodes = await Course.findByPk(id, {
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      include: {
        association: "episodes",
        attributes: [
          "id",
          "name",
          "synopsis",
          "order",
          ["video_url", "videoUrl"],
          ["seconds_long", "secondsLong"],
        ],
        order: [["order", "ASC"]],
        separate: true,
      },
    });
    return courseWithEpisodes;
  },
  getRandomFeaturedCourses: async () => {
    const featuredCourses = await Course.findAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: {
        featured: true,
      },
    });

    const randomFeaturedCourses = featuredCourses.sort(
      () => 0.5 - Math.random()
    );

    return randomFeaturedCourses.slice(0, 3);
  },
  getNewestCourse: async () => {
    const newestCourse = await Course.findAll({
      order: [["created_at", "ASC"]],
      limit: 10,
    });
    return newestCourse;
  },

  getTopTenByLikes: async ()=>{
    const result = await Course.sequelize?.query(
      `SELECT 
          courses.id,
          courses.name,
          courses.synopsis,
          courses.thumbnail_url AS thumbnailUrl,
          COUNT (users.id) AS likes
       FROM courses
          LEFT OUTER JOIN likes
              ON courses.id = likes.course_id
              INNER JOIN users
                  ON users.id = likes.user_id
       GROUP BY courses.id
       ORDER BY likes DESC
       LIMIT 10;
      `
    ) 
    if(result){
      const [ topTen] = result
      return topTen
    } else {
      return null
    }
  },

  findByName: async (name: string, page: number, perPage: number) => {
    const offset = (page - 1) * perPage;
    const { count, rows} = await Course.findAndCountAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: {
        name: { [Op.iLike]: `%${name}%` }, // iLike is a option only to PostgreSQL. It's the same as like operator but is case sensitive
      },
      limit: perPage,
      offset
    });
    return {
      courses: rows,
      page,
      perPage,
      total: count
    }
  },
};

export default courseService;
