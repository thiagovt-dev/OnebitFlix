import { DataTypes, Model, Optional } from "sequelize";
import { database } from "../database/index.js";

export interface Course {
  id: number;
  name: string;
  synopsis: string;
  thumbnailUrl: string;
  featured: boolean;
  categoryId: number;
}

export interface CourseCreationAttributes extends Optional<Course, "id" | "thumbnailUrl" | "featured"> {}

export interface CourseInstance extends Model<Course, CourseCreationAttributes>, Course {}

export const Course = database.define<CourseInstance, Course>("Course", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  synopsis: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnailUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "categories", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
});
