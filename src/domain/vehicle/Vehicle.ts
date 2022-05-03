import { v4 } from "uuid";
import { NegativeKMError, NegativePriceError, NegativeYearError } from "../errors/InvalidVehicleErrors";

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  color: string;
  chassi: string;
  price: number;
  status: VehicleStatus;
}

export enum VehicleStatus {
  AVAILABLE,
  BOOKED,
  SOLD
}

export default class VehicleImpl implements Vehicle {
  id: string;
  
  constructor(public brand: string, public model: string, public year: number, public km: number, public color: string, public chassi: string, public price: number, public status: VehicleStatus = VehicleStatus.AVAILABLE, id?: string) {
    if(year < 0) throw new NegativeYearError();
    if(km < 0) throw new NegativeKMError();
    if(price < 0) throw new NegativePriceError();
    
    id ? this.id = id : this.id = v4();
  }
}