import { Sequelize } from 'sequelize';
import * as dbConfig from '@src/config/databaseConfig';

export const db = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: 'postgres',
    host: dbConfig.host,
    define: dbConfig.define,
  }
);
