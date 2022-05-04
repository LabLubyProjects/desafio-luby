import { v4 } from "uuid";

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
    id ? this.id = id : this.id = v4();
  }
}