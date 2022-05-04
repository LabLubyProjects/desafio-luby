import EmployeeModel from "./EmployeeModel";
import ReservationModel from "./ReservationModel";
import SaleModel from "./SaleModel";
import VehicleModel from "./VehicleModel";

export default function associate(): void {
  VehicleModel.hasOne(SaleModel, { foreignKey: 'vehicle_id', as: 'vehicle_sale' });
  VehicleModel.hasOne(ReservationModel, { foreignKey: 'vehicle_id', as: 'vehicle_reservation' });

  SaleModel.belongsTo(EmployeeModel, { foreignKey: 'employee_id', as: 'employee_sale' });
  SaleModel.belongsTo(VehicleModel, { foreignKey: 'vehicle_id', as: 'vehicle_sale' });

  ReservationModel.belongsTo(EmployeeModel, { foreignKey: 'employee_id', as: 'employee_reservation' });
  ReservationModel.belongsTo(VehicleModel, { foreignKey: 'vehicle_id', as: 'vehicle_reservation' });

  EmployeeModel.hasMany(SaleModel, { foreignKey: 'employee_id', as: 'employee_sale' });
  EmployeeModel.hasMany(ReservationModel, { foreignKey: 'employee_id', as: 'employee_reservation' });
}
