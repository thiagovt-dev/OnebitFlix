import { DataTypes, Model } from "sequelize";
import { CourseInstance } from "./Courses.js";
import { UserInstance } from "./Users.js";
import { database } from "../database/index.js";

export interface Like {
  userId: number;
  courseId: number;
}

export interface LikeInstance extends Model<Like>, Like {
  Course?: CourseInstance;
  User?: UserInstance;
}

export const Like = database.define<LikeInstance, Like>("Like", {
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  courseId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: "courses",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});
