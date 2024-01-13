import { DataTypes, Model } from "sequelize"
import { CourseInstance } from "./Courses.js"
import { UserInstance } from "./Users.js"
import { database } from "../database/index.js"

export interface Favorite {
    userId: number
    courseId: number
}

export interface FavoriteInstance extends Model<Favorite>, Favorite{
    Course?: CourseInstance
    User?: UserInstance
}

export const Favorite = database.define<FavoriteInstance, Favorite>('Favorite', {
    userId :{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references:{
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    courseId :{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references:{
            model: 'courses',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
})