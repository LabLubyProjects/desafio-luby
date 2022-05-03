import { v4, validate } from "uuid";
import { InvalidEmployeeIDError } from "../errors/InvalidEmployeeErrors";
import { InvalidVehicleIDError, NegativePriceError } from "../errors/InvalidVehicleErrors";

export interface Reservation {
  id: string;
  vehicleID: string;
  employeeID: string;
  price: number;
  date: Date;
}

export default class ReservationImpl implements Reservation {
  id: string;
  date: Date;
  
  constructor(public vehicleID: string, public employeeID: string, public price: number, date?: Date, id?: string) {
    if(!vehicleID || !validate(vehicleID)) throw new InvalidVehicleIDError();
    if(!employeeID || !validate(employeeID)) throw new InvalidEmployeeIDError();
    if(price < 0) throw new NegativePriceError();
  
    id ? this.id = id : this.id = v4();
    date ? this.date = date : this.date = new Date();
  }
}