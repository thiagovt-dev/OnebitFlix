import { Category } from './Category.js';
import { Course } from './Courses.js';
import { Episode } from './Episode.js';
import { User } from './Users.js';

Category.hasMany(Course)

Course.belongsTo(Category)
Course.hasMany(Episode)

Episode.belongsTo(Course)

export{
    Category,
    Course,
    Episode,
    User
}