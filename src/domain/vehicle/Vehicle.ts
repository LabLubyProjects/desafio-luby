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
  brand: string;
  model: string;
  year: number;
  km: number;
  color: string;
  chassi: string;
  price: number;
  status: VehicleStatus;
  
  constructor(brand: string, model: string, year: number, km: number, color: string, chassi: string, price: number, status: VehicleStatus, id?: string) {
    if(!id) this.id = v4();
    else this.id = id;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.km = km;
    this.color = color;
    this.chassi = chassi;
    this.price = price;
    this.status = status;
  }
}