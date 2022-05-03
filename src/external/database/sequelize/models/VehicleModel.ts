import { DataTypes } from "sequelize/types"; 
import { db } from "../database";
import SaleModel from "./SaleModel";

const VehicleModel = db.define('vehicle', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  km: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false
  },
  chassi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

VehicleModel.hasOne(SaleModel);

export default VehicleModel;