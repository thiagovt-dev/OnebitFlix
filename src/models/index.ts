import { Category } from './Category.js';
import { Course } from './Courses.js';
import { Episode } from './Episode.js';
import { Favorite } from './Favorite.js';
import { User } from './Users.js';

Category.hasMany(Course, {as: 'courses'})

Course.belongsTo(Category)
Course.hasMany(Episode, {as: 'episodes'})
Course.belongsToMany(User, { through: Favorite})
Course.hasMany(Favorite, { as: 'favoritesUsers', foreignKey: 'course_id'})

Episode.belongsTo(Course)

User.belongsToMany(Course, { through: Favorite})
User.hasMany(Favorite, { as: "favoritesCourses", foreignKey: "user_id" });


export{
    Category,
    Course,
    Episode,
    Favorite,
    User
}