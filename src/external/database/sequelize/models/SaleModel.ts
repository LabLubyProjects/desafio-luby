import { DataTypes } from "sequelize/types";
import { db } from "../database";
import EmployeeModel from "./EmployeeModel";
import VehicleModel from "./VehicleModel";

const SaleModel = db.define('sale', { 
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
});

SaleModel.belongsTo(EmployeeModel, { foreignKey: 'employee_id', as: 'employee_sale' });
SaleModel.belongsTo(VehicleModel, { foreignKey: 'vehicle_id', as: 'vehicle_sale' });

export default SaleModel;