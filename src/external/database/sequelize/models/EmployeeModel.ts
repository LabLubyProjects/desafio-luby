import { DataTypes } from "sequelize";
import { db } from "../database";

const EmployeeModel = db.define("employee", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  biography: {
    type: DataTypes.TEXT
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

export default EmployeeModel;