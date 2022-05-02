import { v4, validate } from "uuid";
import { VehicleStatus } from "../vehicle/Vehicle";
import { InvalidSellerIDError } from "../errors/InvalidSellerErrors";
import { InvalidVehicleIDError } from "../errors/InvalidVehicleErrors";

export interface Sale {
  id: string;
  vehicleID: string;
  sellerID: string;
  price: number;
  date: Date;
  vehicleStatus: VehicleStatus;
}

export default class SaleImpl implements Sale {
  id: string;
  vehicleID: string;
  sellerID: string;
  price: number;
  date: Date;
  vehicleStatus: VehicleStatus;
  
  constructor(vehicleID: string, sellerID: string, price: number, vehicleStatus: VehicleStatus, date?: Date, id?: string) {
    if(!vehicleID || !validate(vehicleID)) throw new InvalidVehicleIDError();
    if(!sellerID || !validate(sellerID)) throw new InvalidSellerIDError();
  
    id ? this.id = id : this.id = v4();
    date ? this.date = date : this.date = new Date();
    this.vehicleID = vehicleID;
    this.sellerID = sellerID;
    this.price = price;
    this.vehicleStatus = vehicleStatus;
  }
}