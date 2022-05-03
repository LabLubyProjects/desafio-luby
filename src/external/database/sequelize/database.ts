import { Sequelize } from "sequelize";
import { dbConfig } from "@src/config/databaseConfigs";

export const db = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: 'postgres',
    host: dbConfig.host,
    define: dbConfig.define
  }
);