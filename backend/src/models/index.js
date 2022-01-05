import Sequelize from "sequelize";
import { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } from "../config";

export const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: "mysql",
  host: DB_HOST,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: false,
  },
  logging: false,
  timezone: "+06:00",
});
