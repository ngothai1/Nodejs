import { Sequelize, DataTypes } from "sequelize";
import mysql2 from "mysql2";

const db = new Sequelize("text4", "root", "", {
  hostost: "localhost",
  dialect: "mysql",
  dialectModule: mysql2,
  logging: false,
});

export default db