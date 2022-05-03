import { DataTypes } from "sequelize/types";
import { db } from "../database";
import ReservationModel from "./ReservationModel";
import SaleModel from "./SaleModel";

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

EmployeeModel.hasMany(SaleModel, { foreignKey: 'employee_id', as: 'employee_sale' });
EmployeeModel.hasMany(ReservationModel, { foreignKey: 'employee_id', as: 'employee_reservation' });

export default EmployeeModel;