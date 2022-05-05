import { v4 } from 'uuid';
import { VehicleStatus } from '../vehicle/Vehicle';

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
  date: Date;

  constructor(
    public vehicleID: string,
    public employeeID: string,
    public price: number,
    public vehicleStatus: VehicleStatus,
    date?: Date,
    id?: string
  ) {
    id ? (this.id = id) : (this.id = v4());
    date ? (this.date = date) : (this.date = new Date());
  }
}
