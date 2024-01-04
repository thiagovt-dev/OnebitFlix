import { Sequelize } from "sequelize";

const database = require('../../config/config.js')

export const sequelize = new Sequelize(database)