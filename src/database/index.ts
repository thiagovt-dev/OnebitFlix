import { Sequelize } from "sequelize";

export const database = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "onebitflix",
  password: "onebitflix",
  database: "dev_onebitflix",
  port: 5433,
  define: {
    timestamps: true,
    underscored: true,
  },
});