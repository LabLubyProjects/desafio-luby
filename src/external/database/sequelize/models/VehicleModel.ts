import { DataTypes } from "sequelize/types"; 
import { db } from "../database";
import ReservationModel from "./ReservationModel";
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

VehicleModel.hasOne(SaleModel, { foreignKey: 'vehicle_id', as: 'vehicle_sale' });
VehicleModel.hasOne(ReservationModel, { foreignKey: 'vehicle_id', as: 'vehicle_reservation' });

export default VehicleModel;