import { Category } from './Category.js';
import { Course } from './Courses.js';

Category.hasMany(Course)
Course.belongsTo(Category)

export{
    Category,
    Course
}