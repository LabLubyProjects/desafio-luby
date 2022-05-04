import { DataTypes } from "sequelize";
import { db } from "../database";

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


export default ReservationModel;