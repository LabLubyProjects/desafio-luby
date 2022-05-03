import { DataTypes } from "sequelize/types";
import { db } from "../database";
import EmployeeModel from "./EmployeeModel";
import VehicleModel from "./VehicleModel";

const ReservationModel = db.define('reservation', { 
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
    }
});

ReservationModel.belongsTo(EmployeeModel);
ReservationModel.belongsTo(VehicleModel);

export default ReservationModel;