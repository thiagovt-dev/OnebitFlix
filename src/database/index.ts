import { Sequelize } from "sequelize";
import { DATABASE_URL } from "../config/environment.js";

export const database = new Sequelize(DATABASE_URL ,{
  define: {
    timestamps: true,
    underscored: true,
  },
});