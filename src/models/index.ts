import { Category } from "./Category.js";
import { Course } from "./Courses.js";
import { Episode } from "./Episode.js";
import { Favorite } from "./Favorite.js";
import { Like } from "./Like.js";
import { User } from "./Users.js";

Category.hasMany(Course, { as: "courses" });

Course.belongsTo(Category);
Course.hasMany(Episode, { as: "episodes" });
Course.belongsToMany(User, { through: Favorite });
Course.belongsToMany(User, { through: Like });
Course.hasMany(Favorite, { foreignKey: "course_id" });

Episode.belongsTo(Course);

Favorite.belongsTo(Course);
Favorite.belongsTo(User);

User.belongsToMany(Course, { through: Favorite });
User.belongsToMany(Course, { through: Like });
User.hasMany(Favorite, { foreignKey: "user_id" });

export { Category, Course, Episode, Favorite, Like, User };
