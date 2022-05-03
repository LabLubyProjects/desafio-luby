import { VehicleStatus } from "@src/domain/vehicle/Vehicle";

export interface InputSell {
  vehicleID: string;
  employeeID: string;
  price: number;
}

export interface OutputSale {
  id: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleStatus: string;
  price: number;
  employeeName: string;
  date: string;
}