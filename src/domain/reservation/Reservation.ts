import { v4, validate } from "uuid";
import { InvalidEmployeeIDError } from "../errors/InvalidEmployeeErrors";
import { InvalidVehicleIDError } from "../errors/InvalidVehicleErrors";

export interface Reservation {
  id: string;
  vehicleID: string;
  employeeID: string;
  price: number;
  date: Date;
}

export default class ReservationImpl implements Reservation {
  id: string;
  vehicleID: string;
  employeeID: string;
  price: number;
  date: Date;
  
  constructor(vehicleID: string, employeeID: string, price: number, date?: Date, id?: string) {
    if(!vehicleID || !validate(vehicleID)) throw new InvalidVehicleIDError();
    if(!employeeID || !validate(employeeID)) throw new InvalidEmployeeIDError();
  
    id ? this.id = id : this.id = v4();
    date ? this.date = date : this.date = new Date();
    this.vehicleID = vehicleID;
    this.employeeID = employeeID;
    this.price = price;
  }
}