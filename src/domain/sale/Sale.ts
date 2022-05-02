import { v4, validate } from "uuid";
import { VehicleStatus } from "../vehicle/Vehicle";
import { InvalidEmployeeIDError } from "../errors/InvalidEmployeeErrors";
import { InvalidVehicleIDError } from "../errors/InvalidVehicleErrors";

export interface Sale {
  id: string;
  vehicleID: string;
  employeeID: string;
  price: number;
  date: Date;
  vehicleStatus: VehicleStatus;
}

export default class SaleImpl implements Sale {
  id: string;
  vehicleID: string;
  employeeID: string;
  price: number;
  date: Date;
  vehicleStatus: VehicleStatus;
  
  constructor(vehicleID: string, employeeID: string, price: number, vehicleStatus: VehicleStatus, date?: Date, id?: string) {
    if(!vehicleID || !validate(vehicleID)) throw new InvalidVehicleIDError();
    if(!employeeID || !validate(employeeID)) throw new InvalidEmployeeIDError();
  
    id ? this.id = id : this.id = v4();
    date ? this.date = date : this.date = new Date();
    this.vehicleID = vehicleID;
    this.employeeID = employeeID;
    this.price = price;
    this.vehicleStatus = vehicleStatus;
  }
}